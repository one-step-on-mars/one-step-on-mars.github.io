/**
 * Module that registers the outdoors functionality
 */

var Outside = {
	name: _("Outside"),
	
	
	_STORES_OFFSET: 0,
	_GATHER_DELAY: 60,
	_TRAPS_DELAY: 90,
	_POP_DELAY: [0.5, 3],
	_HUT_ROOM: 4,
	
	_INCOME: {
		'PowerProduction': {
			name: _('PowerProduction'),
			delay: 10,
			stores: {
				'energy': 1
			}
		},
		'hunter': {
			name: _('hunter'),
			delay: 10,
			stores: {
				'shells': 0.5,
				'meat': 0.5
			}
		},
		'trapper': {
			name: _('trapper'),
			delay: 10,
			stores: {
				'meat': -1,
				'bait': 1
			}
		},
		'chemist': {
			name: _('chemist'),
			delay: 10,
			stores: {
				'shells': -5,
				'bioplastic': 1
			}
		},
		'food_irradiator': {
			name: _('food_irradiator'),
			delay: 10,
			stores: {
				'meat': -5,
				'energy': -5,
				'ration packs': 1
			}
		},
		'salvage hunter': {
			name: _('salvage hunter'),
			delay: 10,
			stores: {
				'ration packs': -1,
				'scrap metal': 1
			}
		},
		'centrifugescientist': {
			name: _('centrifugescientist'),
			delay: 10,
			stores: {
				'ration packs': -1,
				'martion elements': 1
			}
		},
		'MunitionsExpert': {
			name: _('MunitionsExpert'),
			delay: 10,
			stores: {
				'ration packs': -1,
				'Explosives': 1
			}
		},
		'alloyworker': {
			name: _('alloyworker'),
			delay: 10,
			stores: {
				'scrap metal': -1,
				'martion elements': -1,
				'alloy': 1
			}
		},
		'armourer': {
			name: _('armourer'),
			delay: 10,
			stores: {
				'alloy': -1,
				'Explosives': -1,
				'bullets': 1
			}
		}
	},
	
	TrapDrops: [
		{
			rollUnder: 0.5,
			name: 'shells',
			message: _('scraps of shells')
		},
		{
			rollUnder: 0.75,
			name: 'meat',
			message: _('bits of meat')
		},
		{
			rollUnder: 0.85,
			name: 'scales',
			message: _('strange scales')
		},
		{
			rollUnder: 0.93,
			name: 'spines',
			message: _('scattered spines')
		},
		{
			rollUnder: 0.995,
			name: 'batterys',
			message: _('assorted batterys')
		},
		{
			rollUnder: 1.0,
			name: 'charm',
			message: _('a crudely made charm')
		}
	],
	
	init: function(options) {
		this.options = $.extend(
			this.options,
			options
		);
		
		if(Engine._debug) {
			this._GATHER_DELAY = 0;
			this._TRAPS_DELAY = 0;
		}
		
		// Create the outside tab
		this.tab = Header.addLocation(_("Martian Volcano"), "outside", Outside);
		
		// Create the Outside panel
		this.panel = $('<div>').attr('id', "outsidePanel")
			.addClass('location')
			.appendTo('div#locationSlider');
		
		//subscribe to stateUpdates
		$.Dispatch('stateUpdate').subscribe(Outside.handleStateUpdates);
		
		if(typeof $SM.get('features.location.outside') == 'undefined') {
			$SM.set('features.location.outside', true);
			if(!$SM.get('game.buildings')) $SM.set('game.buildings', {});
			if(!$SM.get('game.population')) $SM.set('game.population', 0);
			if(!$SM.get('game.workers')) $SM.set('game.workers', {});
		}
		
		this.updateSettlement();
		Outside.updateWorkersView();
		Outside.updateSettlementIncome();
		
		Engine.updateSlider();
		
		// Create the gather button
		new Button.Button({
			id: 'gatherButton',
			text: _("Clean habs solar panels"),
			click: Outside.gatherenergy,
			cooldown: Outside._GATHER_DELAY,
			width: '80px'
		}).appendTo('div#outsidePanel');

		Outside.updateTrapButton();
	},
	
	getMaxPopulation: function() {
		return $SM.get('game.buildings["bunker"]', true) * Outside._HUT_ROOM;
	},
	
	increasePopulation: function() {
		var space = Outside.getMaxPopulation() - $SM.get('game.population');
		if(space > 0) {
			var num = Math.floor(Math.random()*(space/2) + space/2);
			if(num === 0) num = 1;
			if(num == 1) {
				Notifications.notify(null, _('another astronaught wakes from there stasis pod'));
			} else if(num < 5) {
				Notifications.notify(null, _('a travaler from another landing sight takes refuge in one of the bunkers.'));
			} else if(num < 10) {
				Notifications.notify(null, _('a small group of surviers arive from another crash sight takeing refuge in one of the bunkers.'));
			} else if(num < 30) {
				Notifications.notify(null, _('a mission from earth decides to land near the hab to join you after hearing of your success on the red planet.'));
			} else {
				Notifications.notify(null, _("your settlement is booming."));
			}
			Engine.log('population increased by ' + num);
			$SM.add('game.population', num);
		}
		Outside.schedulePopIncrease();
	},
	
	killCrew: function(num) {
		$SM.add('game.population', num * -1);
		if($SM.get('game.population') < 0) {
			$SM.set('game.population', 0);
		}
		var remaining = Outside.getNumPowerProductions();
		if(remaining < 0) {
			var gap = -remaining;
			for(var k in $SM.get('game.workers')) {
				var numWorkers = $SM.get('game.workers["'+k+'"]');
				if(numWorkers < gap) {
					gap -= numWorkers;
					$SM.set('game.workers["'+k+'"]', 0);
				} else {
					$SM.add('game.workers["'+k+'"]', gap * -1);
					break;
				}
			}
		}
	},
	
	destroyHuts: function(num, allowEmpty) {
		var dead = 0;
		for(var i = 0; i < num; i++){
			var population = $SM.get('game.population', true);
			var rate = population / Outside._HUT_ROOM;
			var full = Math.floor(rate);
			// by default this is used to destroy full or half-full huts
			// pass allowEmpty to include empty huts in the armageddon
			var huts = (allowEmpty) ? $SM.get('game.buildings["bunker"]', true) : Math.ceil(rate);
			if(!huts) {
				break;
			}
			// random can be 0 but not 1; however, 0 as a target is useless
			var target = Math.floor(Math.random() * huts) + 1;
			var inhabitants = 0;
			if(target <= full){
				inhabitants = Outside._HUT_ROOM;
			} else if(target == full + 1){
				inhabitants = population % Outside._HUT_ROOM;
			}
			$SM.set('game.buildings["bunker"]', ($SM.get('game.buildings["bunker"]') - 1));
			if(inhabitants){
				Outside.killCrew(inhabitants);
				dead += inhabitants;
			}
		}
		// this method returns the total number of victims, for ferther actions
		return dead;
	},
	
	schedulePopIncrease: function() {
		var nextIncrease = Math.floor(Math.random()*(Outside._POP_DELAY[1] - Outside._POP_DELAY[0])) + Outside._POP_DELAY[0];
		Engine.log('next population increase scheduled in ' + nextIncrease + ' minutes');
		Outside._popTimeout = Engine.setTimeout(Outside.increasePopulation, nextIncrease * 60 * 1000);
	},
	
	updateWorkersView: function() {
		var workers = $('div#workers');

		// If our population is 0 and we don't already have a workers view,
		// there's nothing to do here.
		if(!workers.length && $SM.get('game.population') === 0) return;

		var needsAppend = false;
		if(workers.length === 0) {
			needsAppend = true;
			workers = $('<div>').attr('id', 'workers').css('opacity', 0);
		}
		
		var numPowerProductions = $SM.get('game.population');
		var PowerProduction = $('div#workers_row_PowerProduction', workers);
		
		for(var k in $SM.get('game.workers')) {
			var lk = _(k);
			var workerCount = $SM.get('game.workers["'+k+'"]');
			var row = $('div#workers_row_' + k.replace(' ', '-'), workers);
			if(row.length === 0) {
				row = Outside.makeWorkerRow(k, workerCount);
				
				var curPrev = null;
				workers.children().each(function(i) {
					var child = $(this);
					var cName = child.children('.row_key').text();
					if(cName != 'PowerProduction') {
						if(cName < lk) {
							curPrev = child.attr('id');
						}
					}
				});
				if(curPrev == null && PowerProduction.length === 0) {
					row.prependTo(workers);
				} else if(curPrev == null) {
					row.insertAfter(PowerProduction);
				} else {
					row.insertAfter(workers.find('#'+ curPrev));
				}
				
			} else {
				$('div#' + row.attr('id') + ' > div.row_val > span', workers).text(workerCount);
			}
			numPowerProductions -= workerCount;
			if(workerCount === 0) {
				$('.dnBtn', row).addClass('disabled');
				$('.dnManyBtn', row).addClass('disabled');
			} else {
				$('.dnBtn', row).removeClass('disabled');
				$('.dnManyBtn', row).removeClass('disabled');
			}
		}
		
		if(PowerProduction.length === 0) {
			PowerProduction = Outside.makeWorkerRow('PowerProduction', numPowerProductions);
			PowerProduction.prependTo(workers);
		} else {
			$('div#workers_row_PowerProduction > div.row_val > span', workers).text(numPowerProductions);
		}
		
		if(numPowerProductions === 0) {
			$('.upBtn', '#workers').addClass('disabled');
			$('.upManyBtn', '#workers').addClass('disabled');
		} else {
			$('.upBtn', '#workers').removeClass('disabled');
			$('.upManyBtn', '#workers').removeClass('disabled');
		}
		
		
		if(needsAppend && workers.children().length > 0) {
			workers.appendTo('#outsidePanel').animate({opacity:1}, 300, 'linear');
		}
	},
	
	getNumPowerProductions: function() {
		var num = $SM.get('game.population'); 
		for(var k in $SM.get('game.workers')) {
			num -= $SM.get('game.workers["'+k+'"]');
		}
		return num;
	},
	
	makeWorkerRow: function(key, num) {
		name = Outside._INCOME[key].name;
		if(!name) name = key;
		var row = $('<div>')
			.attr('key', key)
			.attr('id', 'workers_row_' + key.replace(' ','-'))
			.addClass('workerRow');
		$('<div>').addClass('row_key').text(name).appendTo(row);
		var val = $('<div>').addClass('row_val').appendTo(row);
		
		$('<span>').text(num).appendTo(val);
		
		if(key != 'PowerProduction') {
			$('<div>').addClass('upBtn').appendTo(val).click([1], Outside.increaseWorker);
			$('<div>').addClass('dnBtn').appendTo(val).click([1], Outside.decreaseWorker);
			$('<div>').addClass('upManyBtn').appendTo(val).click([10], Outside.increaseWorker);
			$('<div>').addClass('dnManyBtn').appendTo(val).click([10], Outside.decreaseWorker);
		}
		
		$('<div>').addClass('clear').appendTo(row);
		
		var tooltip = $('<div>').addClass('tooltip bottom right').appendTo(row);
		var income = Outside._INCOME[key];
		for(var s in income.stores) {
			var r = $('<div>').addClass('storeRow');
			$('<div>').addClass('row_key').text(_(s)).appendTo(r);
			$('<div>').addClass('row_val').text(Engine.getIncomeMsg(income.stores[s], income.delay)).appendTo(r);
			r.appendTo(tooltip);
		}
		
		return row;
	},
	
	increaseWorker: function(btn) {
		var worker = $(this).closest('.workerRow').attr('key');
		if(Outside.getNumPowerProductions() > 0) {
			var increaseAmt = Math.min(Outside.getNumPowerProductions(), btn.data);
			Engine.log('increasing ' + worker + ' by ' + increaseAmt);
			$SM.add('game.workers["'+worker+'"]', increaseAmt);
		}
	},
	
	decreaseWorker: function(btn) {
		var worker = $(this).closest('.workerRow').attr('key');
		if($SM.get('game.workers["'+worker+'"]') > 0) {
			var decreaseAmt = Math.min($SM.get('game.workers["'+worker+'"]') || 0, btn.data);
			Engine.log('decreasing ' + worker + ' by ' + decreaseAmt);
			$SM.add('game.workers["'+worker+'"]', decreaseAmt * -1);
		}
	},
	
	updateSettlementRow: function(name, num, settlement) {
		var id = 'building_row_' + name.replace(' ', '-');
		var lname = _(name);
		var row = $('div#' + id, settlement);
		if(row.length === 0 && num > 0) {
			row = $('<div>').attr('id', id).addClass('storeRow');
			$('<div>').addClass('row_key').text(lname).appendTo(row);
			$('<div>').addClass('row_val').text(num).appendTo(row);
			$('<div>').addClass('clear').appendTo(row);
			var curPrev = null;
			settlement.children().each(function(i) {
				var child = $(this);
				if(child.attr('id') != 'population') {
					var cName = child.children('.row_key').text();
					if(cName < lname) {
						curPrev = child.attr('id');
					}
				}
			});
			if(curPrev == null) {
				row.prependTo(settlement);
			} else {
				row.insertAfter('#' + curPrev);
			}
		} else if(num > 0) {
			$('div#' + row.attr('id') + ' > div.row_val', settlement).text(num);
		} else if(num === 0) {
			row.remove();
		}
	},
	
	updateSettlement: function(ignoreStores) {
		var settlement = $('div#settlement');
		var population = $('div#population');
		var needsAppend = false;
		if(settlement.length === 0) {
			needsAppend = true;
			settlement = $('<div>').attr('id', 'settlement').css('opacity', 0);
			population = $('<div>').attr('id', 'population').appendTo(settlement);
		}
		
		for(var k in $SM.get('game.buildings')) {
			if(k == 'bug trap') {
				var numTraps = $SM.get('game.buildings["'+k+'"]');
				var numBait = $SM.get('stores.bait', true);
				var traps = numTraps - numBait;
				traps = traps < 0 ? 0 : traps;
				Outside.updateSettlementRow(k, traps, settlement);
				//Outside.updateSettlementRow('baited bug trap', numBait > numTraps ? numTraps : numBait, settlement);
			} else {
				if(Outside.checkWorker(k)) {
					Outside.updateWorkersView();
				}
				Outside.updateSettlementRow(k, $SM.get('game.buildings["'+k+'"]'), settlement);
			}
		}
		
		/// TRANSLATORS : pop is short for population.
		population.text(_('pop ') + $SM.get('game.population') + '/' + this.getMaxPopulation());
		
		var hasPeeps;
		if($SM.get('game.buildings["bunker"]', true) === 0) {
			hasPeeps = false;
			settlement.attr('data-legend', _('your settlement'));
		} else {
			hasPeeps = true;
			settlement.attr('data-legend', _('settlement'));
		}
		
		if(needsAppend && settlement.children().length > 1) {
			settlement.prependTo('#outsidePanel');
			settlement.animate({opacity:1}, 300, 'linear');
		}
		
		if(hasPeeps && typeof Outside._popTimeout == 'undefined') {
			Outside.schedulePopIncrease();
		}
		
		this.setTitle();

		if(!ignoreStores && Engine.activeModule === Outside && settlement.children().length > 1) {
			$('#storesContainer').css({top: settlement.height() + 26 + Outside._STORES_OFFSET + 'px'});
			
		}
	},
	
	checkWorker: function(name) {
		var jobMap = {
			'bug tracking': ['hunter', 'trapper'],
			'polymerisation equipment': ['chemist'],
			'irradiator': ['food_irradiator'],
			'metal detectors': ['salvage hunter'],
			'centrifuge': ['centrifugescientist'],
			'ExplosivesLab': ['MunitionsExpert'],
			'alloyworks': ['alloyworker'],
			'armoury' : ['armourer']
		};
		
		var jobs = jobMap[name];
		var added = false;
		if(typeof jobs == 'object') {
			for(var i = 0, len = jobs.length; i < len; i++) {
				var job = jobs[i];
				if(typeof $SM.get('game.buildings["'+name+'"]') == 'number' && 
						typeof $SM.get('game.workers["'+job+'"]') != 'number') {
					Engine.log('adding ' + job + ' to the workers list');
					$SM.set('game.workers["'+job+'"]', 0);
					added = true;
				}
			}
		}
		return added;
		
	},
	
	
	updateSettlementIncome: function() {
		
		for(var worker in Outside._INCOME) {
			var income = Outside._INCOME[worker];
			var num = worker == 'PowerProduction' ? Outside.getNumPowerProductions() : $SM.get('game.workers["'+worker+'"]');
			if(typeof num == 'number') {
				var stores = {};
				if(num < 0) num = 0;
				var tooltip = $('.tooltip', 'div#workers_row_' + worker.replace(' ', '-'));
				tooltip.empty();
				var needsUpdate = false;
				var curIncome = $SM.getIncome(worker);
				for(var store in income.stores) {
					stores[store] = income.stores[store] * num;
					if(curIncome[store] != stores[store]) needsUpdate = true;
					var row = $('<div>').addClass('storeRow');
					$('<div>').addClass('row_key').text(_(store)).appendTo(row);
					$('<div>').addClass('row_val').text(Engine.getIncomeMsg(stores[store], income.delay)).appendTo(row);
					row.appendTo(tooltip);
				}
				if(needsUpdate) {
					$SM.setIncome(worker, {
						delay: income.delay,
						stores: stores
					});
				}
			}
		}
		Room.updateIncomeView();
	},
	
	updateTrapButton: function() {
		var btn = $('div#trapsButton');
		if($SM.get('game.buildings["bug trap"]', true) > 0) {
			if(btn.length === 0) {
				new Button.Button({
					id: 'trapsButton',
					text: _("check traps"),
					click: Outside.checkTraps,
					cooldown: Outside._TRAPS_DELAY,
					width: '80px'
				}).appendTo('div#outsidePanel');
			} else {
				Button.setDisabled(btn, false);
			}
		} else {
			if(btn.length > 0) {
				Button.setDisabled(btn, true);
			}
		}
	},
	
	setTitle: function() {
		var numHuts = $SM.get('game.buildings["bunker"]', true);
		var title;
		if(numHuts === 0) {
			title = _("Martian Volcano");
		} else if(numHuts == 1) {
			title = _("A Small Bunker");
		} else if(numHuts <= 4) {
			title = _("Large Bunker");
		} else if(numHuts <= 8) {
			title = _("Small Bunker Complex");
		} else if(numHuts <= 14) {
			title = _("Large Bunker Complex");
		} else {
			title = _("A Thriving Outpost");
		}
		
		if(Engine.activeModule == this) {
			document.title = title;
		}
		$('#location_outside').text(title);
	},
	
	onArrival: function(transition_diff) {
		Outside.setTitle();
		if(!$SM.get('game.outside.seenForest')) {
			Notifications.notify(Outside, _("its a dry and dusty place even after all the years of teraforming with only the very toughest organisums around"));
			$SM.set('game.outside.seenForest', true);
		}
		Outside.updateTrapButton();
		Outside.updateSettlement(true);

		Engine.moveStoresView($('#settlement'), transition_diff);
	},
	
	gatherenergy: function() {
		Notifications.notify(Outside, _("you clear away some of the fine dust covering the panels"));
		var gatherAmt = $SM.get('game.buildings["focus solar"]', true) > 0 ? 50 : 10;
		$SM.add('stores.energy', gatherAmt);
	},
	
	checkTraps: function() {
		var drops = {};
		var msg = [];
		var numTraps = $SM.get('game.buildings["bug trap"]', true);
		var numBait = $SM.get('stores.bait', true);
		var numDrops = numTraps + (numBait < numTraps ? numBait : numTraps);
		for(var i = 0; i < numDrops; i++) {
			var roll = Math.random();
			for(var j in Outside.TrapDrops) {
				var drop = Outside.TrapDrops[j];
				if(roll < drop.rollUnder) {
					var num = drops[drop.name];
					if(typeof num == 'undefined') {
						num = 0;
						msg.push(drop.message);
					}
					drops[drop.name] = num + 1;
					break;
				}
			}
		}
		/// TRANSLATORS : Mind the /*/*rgb(218, 93, 55)*/transparentspace at the end.
		var s = _('the traps contain ');
		for(var l = 0, len = msg.length; l < len; l++) {
			if(len > 1 && l > 0 && l < len - 1) {
				s += ", ";
			} else if(len > 1 && l == len - 1) {
				/// TRANSLATORS : Mind the /*/*rgb(218, 93, 55)*/transparentspaces at the beginning and end.
				s += _(" and ");
			}
			s += msg[l];
		}
		
		var baitUsed = numBait < numTraps ? numBait : numTraps;
		drops['bait'] = -baitUsed;
		
		Notifications.notify(Outside, s);
		$SM.addM('stores', drops);
	},
	
	handleStateUpdates: function(e){
		if(e.category == 'stores'){
			Outside.updateSettlement();
		} else if(e.stateName.indexOf('game.workers') === 0 || e.stateName.indexOf('game.population') === 0){
			Outside.updateSettlement();
			Outside.updateWorkersView();
			Outside.updateSettlementIncome();
		}
	},

	scrollSidebar: function(direction, reset) {

		if( typeof reset != "undefined" ){
			$('#settlement').css('top', '0px');
			$('#storesContainer').css('top', '224px');
			Outside._STORES_OFFSET = 0;
			return false;
		}

		var momentum = 10;
		
		// If they hit up, we scroll everything down
		if( direction == 'up' )
			momentum = momentum * -1;

		/* Let's stop scrolling if the top or bottom bound is in the viewport, based on direction */
		if( direction == 'down' && inView( direction, $('#settlement') ) ){

			return false;

		}else if( direction == 'up' && inView( direction, $('#storesContainer') ) ){

			return false;

		}
		
		scrollByX( $('#settlement'), momentum );
		scrollByX( $('#storesContainer'), momentum );
		Outside._STORES_OFFSET += momentum;

	}
};
