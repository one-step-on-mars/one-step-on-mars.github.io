/**
 * Module that registers the simple room functionality
 */
var Room = {
	// times in (minutes * seconds * milliseconds)
	_FIRE_COOL_DELAY: 5 * 60 * 1000, // time after a stoke before the fire cools
	_ROOM_COMFORTABLE_DELAY: 30 * 1000, // time between room temperature updates
	_engineer_STATE_DELAY: 0.5 * 60 * 1000, // time between engineer state updates
	_STOKE_COOLDOWN: 10, // cooldown to stoke the fire
	_NEED_energy_DELAY: 15 * 1000, // from when the stranger shows up, to when you need energy
	
	buttons:{},
	
	Craftables: {
		'bug trap': {
			name: _('bug trap'),
			button: null,
			maximum: 10,
			availableMsg: _('the enginer says the martian wildlife has developed a lot since it was introduced and she can make traps to catch some of it'),
			buildMsg: _('more traps to catch more creaturees'),
			maxMsg: _("more traps won't help now"),
			type: 'building',
			cost: function() {
				var n = $SM.get('game.buildings["bug trap"]', true);
				return {
					'energy': 10 + (n*10)
				};
			}
		},
		'focus solar': {
			name: _('focus solar'),
			button: null,
			maximum: 1,
			availableMsg: _('the enginer says she can weld reflective parts of the wreckage around the solar panels so they produce more energy.'),
			buildMsg: _('the shiny surfaces reflect more light onto the solar panles.'),
			type: 'building',
			cost: function() {
				return {
					'energy': 30
				};
			}
		},
		'bunker': {
			name: _('bunker'),
			button: null,
			maximum: 20,
			availableMsg: _("You find other crew members still in there stasis pods around the crash sight"),
			buildMsg: _('you and the enginer use the power you saved to seal of part of a near by larva tube to form a bunker'),
			maxMsg: _('theres no more room left in the lava tubes.'),
			type: 'building',
			cost: function() {
				var n = $SM.get('game.buildings["bunker"]', true);
				return {
					'energy': 100 + (n*50)
				};
			}
		},
		'bug tracking': {
			name: _('bug tracking'),
			button: null,
			maximum: 1,
			availableMsg: _('other crew members could help hunt, given the means'),
			buildMsg: _('between you work out how to track and hunt down the gient martian bugs'),
			type: 'building',
			cost: function() {
				return {
					energy: 200,
					shells: 10,
					meat: 5
				};
			}
		},
		'trading post': {
			name: _('trading post'),
			button: null,
			maximum: 1,
			availableMsg: _("a trading post would make commerce easier"),
			buildMsg: _("now we have a place to orginise trade trade with the other landing sights"),
			type: 'building',
			cost: function() {
				return {
					'energy': 400,
					'shells': 100
				};
			}
		},
		'polymerisation equipment': {
			name: _('polymerisation equipment'),
			button: null,
			maximum: 1,
			availableMsg: _("engineer says bioplastic could be useful. says the crew could make it."),
			buildMsg: _('polymerisation equipment goes up quick, on the edge of the settlement'),
			type: 'building',
			cost: function() {
				return {
					'energy': 500,
					'shells': 50
				};
			}
		},
		'irradiator': {
			name: _('irradiator'),
			button: null,
			maximum: 1,
			availableMsg: _("should treat the meat, or it'll spoil. engineer says she can come up with something."),
			buildMsg: _('engineer finishes the irradiator. she looks hungry.'),
			type: 'building',
			cost: function() {
				return {
					'energy': 600,
					'meat': 50
				};
			}
		},
		'workshop': {
			name: _('workshop'),
			button: null,
			maximum: 1,
			availableMsg: _("engineer says she could make finer things, if she had the tools"),
			buildMsg: _("workshop's finally ready. engineer's excited to get to it"),
			type: 'building',
			cost: function() {
				return {
					'energy': 800,
					'bioplastic': 100,
					'scales': 10
				};
			}
		},
		'alloyworks': {
			name: _('alloyworks'),
			button: null,
			maximum: 1,
			availableMsg: _("engineer says the crew could make alloy, given the tools"),
			buildMsg: _("a haze falls over the settlement as the alloyworks fires up"),
			type: 'building',
			cost: function() {
				return {
					'energy': 1500,
					'scrap metal': 100,
					'martion elements': 100
				};
			}
		},
		'armoury': {
			name: _('armoury'),
			button: null,
			maximum: 1,
			availableMsg: _("engineer says it'd be useful to have a steady source of bullets"),
			buildMsg: _("armoury's done, welcoming back the weapons of the past."),
			type: 'building',
			cost: function() {
				return {
					'energy': 3000,
					'alloy': 100,
					'Explosives': 50
				};
			}
		},
		'torch': {
			name: _('torch'),
			button: null,
			type: 'tool',
			buildMsg: _('a torch to keep the dark away'),
			cost: function() {
				return {
					'energy': 1,
					'batterys': 1
				};
			}
		},
		'plasticO2tank': {
			name: _('plasticO2tank'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('this plasticO2tank\'ll hold a bit of O2, at least'),
			cost: function() {
				return {
					'bioplastic': 50
				};
			}
		},
		'cask': {
			name: _('cask'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('the cask holds enough O2 for longer expeditions'),
			cost: function() {
				return {
					'bioplastic': 100,
					'scrap metal': 20
				};
			}
		},
		'O2 tank': {
			name: _('O2 tank'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('never go thirsty again'),
			cost: function() {
				return {
					'scrap metal': 100,
					'alloy': 50
				};
			}
		},
		'bone spear': {
			name: _('bone spear'),
			button: null,
			type: 'weapon',
			buildMsg: _("this spear's not elegant, but it's pretty good at stabbing"),
			cost: function() {
				return {
					'energy': 100,
					'spines': 5
				};
			}
		},
		'rucksack': {
			name: _('rucksack'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('carrying more means longer expeditions to the wilds'),
			cost: function() {
				return {
					'bioplastic': 200
				};
			}
		},
		'wagon': {
			name: _('wagon'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('the wagon can carry a lot of supplies'),
			cost: function() {
				return {
					'energy': 500,
					'scrap metal': 100
				};
			}
		},
		'Land_Ship': {
			name: _('land_ship'),
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: _('the land_ship can haul mostly everything'),
			cost: function() {
				return {
					'energy': 1000,
					'scrap metal': 200,
					'alloy': 100
				};
			}
		},
		'thick suit': {
			name: _('thick suit'),
			type: 'upgrade',
			maximum: 1,
			buildMsg: _("bioplastic's not strong. better than rags, though."),
			cost: function() {
				return {
					'bioplastic': 200,
					'scales': 20
				};
			}
		},
		'i armour': {
			name: _('i armour'),
			type: 'upgrade',
			maximum: 1,
			buildMsg: _("scrap metal's stronger than bioplastic"),
			cost: function() {
				return {
					'bioplastic': 200,
					'scrap metal': 100
				};
			}
		},
		'alloy armour': {
			name: _('alloy armour'),
			type: 'upgrade',
			maximum: 1,
			buildMsg: _("alloy's stronger than scrap metal"),
			cost: function() {
				return {
					'bioplastic': 200,
					'alloy': 100
				};
			}
		},
		'scrap sword': {
			name: _('scrap sword'),
			button: null,
			type: 'weapon',
			buildMsg: _("sword is sharp. good protection out in the wilds."),
			cost: function() {
				return {
					'energy': 200,
					'bioplastic': 50,
					'scrap metal': 20
				};
			}
		},
		'alloy sword': {
			name: _('alloy sword'),
			button: null,
			type: 'weapon',
			buildMsg: _("the alloy is strong, and the blade true."),
			cost: function() {
				return {
					'energy': 500,
					'bioplastic': 100,
					'alloy': 20
				};
			}
		},
		'rifle': {
			name: _('rifle'),
			type: 'weapon',
			buildMsg: _("black powder and bullets, like the old days."),
			cost: function() {
				return {
					'energy': 200,
					'alloy': 50,
					'Explosives': 50
				};
			}
		}
	},
	
	TradeGoods: {
		'scales': {
			type: 'good',
			cost: function() {
				return { shells: 150 };
			}
		},
		'spines': {
			type: 'good',
			cost: function() {
				return { shells: 300 };
			}
		},
		'scrap metal': {
			type: 'good',
			cost: function() {
				return {
					'shells': 150,
					'scales': 50
				};
			}
		},
		'martion elements': {
			type: 'good',
			cost: function() {
				return {
					'shells': 200,
					'spines': 50
				};
			}
		},
		'alloy': {
			type: 'good',
			cost: function() {
				return {
					'shells': 300,
					'scales': 50,
					'spines': 50
				};
			}
		},
		'medicine': {
			type: 'good',
			cost: function() {
				return {
					'scales': 50, 'spines': 30
				};
			}
		},
		'bullets': {
			type: 'good',
			cost: function() {
				return {
					'scales': 10
				};
			}
		},
		'antimatter cell': {
			type: 'good',
			cost: function() {
				return {
					'scales': 10,
					'spines': 10
				};
			}
		},
		'bolas': {
			type: 'weapon',
			cost: function() {
				return {
					'spines': 10
				};
			}
		},
		'grenade': {
			type: 'weapon',
			cost: function() {
				return {
					'scales': 100,
					'spines': 50
				};
			}
		},
		'bayonet': {
			type: 'weapon',
			cost: function() {
				return {
					'scales': 500,
					'spines': 250
				};
			}
		},
		'supermaterials': {
			type: 'good',
			cost: function() {
				return {
					'shells': 1500,
					'scales': 750,
					'spines': 300
				};
			}
		},
		'SolarRover': {
			type: 'special',
			maximum: 1,
			cost: function() {
				return { 
					shells: 400, 
					scales: 20, 
					spines: 10 
				};
			}
		}
	},
	
	MiscItems: {
		'positronic ray': {
			type: 'weapon'
		}
	},
	
	name: _("Room"),
	init: function(options) {
		this.options = $.extend(
			this.options,
			options
		);
		
		Room.pathDiscovery = Boolean($SM.get('stores["SolarRover"]'));

		if(Engine._debug) {
			this._ROOM_COMFORTABLE_DELAY = 5000;
			this._engineer_STATE_DELAY = 5000;
			this._STOKE_COOLDOWN = 0;
			this._NEED_energy_DELAY = 5000;
		}
		
		if(typeof $SM.get('features.location.room') == 'undefined') {
			$SM.set('features.location.room', true);
			$SM.set('game.engineer.level', -1);
		}
		
		// If this is the first time playing, the air is dead and it's claustrophobic. 
		// Otherwise grab past save state temp and fire level.
		$SM.set('game.temperature', $SM.get('game.temperature.value')===undefined?this.TempEnum.Claustrophobic:$SM.get('game.temperature'));
		$SM.set('game.fire', $SM.get('game.fire.value')===undefined?this.FireEnum.Dead:$SM.get('game.fire'));
		
		// Create the room tab
		this.tab = Header.addLocation(_("One small Step On Mars"), "room", Room);
		
		// Create the Room panel
		this.panel = $('<div>')
			.attr('id', "roomPanel")
			.addClass('location')
			.appendTo('div#locationSlider');
			 
		Engine.updateSlider();
		
		// Create the light button
		new Button.Button({
			id: 'lightButton',
			text: _('start CO2 scrubers'),
			click: Room.lightFire,
			cooldown: Room._STOKE_COOLDOWN,
			width: '80px',
			cost: {'energy': 5}
		}).appendTo('div#roomPanel');
		
		// Create the stoke button
		new Button.Button({
			id: 'stokeButton',
			text: _("cleen air filter"),
			click: Room.stokeFire,
			cooldown: Room._STOKE_COOLDOWN,
			width: '80px',
			cost: {'energy': 1}
		}).appendTo('div#roomPanel');
		
		// Create the stores container
		$('<div>').attr('id', 'storesContainer').prependTo('div#roomPanel');
		
		//subscribe to stateUpdates
		$.Dispatch('stateUpdate').subscribe(Room.handleStateUpdates);
		
		Room.updateButton();
		Room.updateStoresView();
		Room.updateIncomeView();
		Room.updateBuildButtons();
		
		Room._fireTimer = Engine.setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
		Room._tempTimer = Engine.setTimeout(Room.adjustTemp, Room._ROOM_COMFORTABLE_DELAY);
		
		/*
		 * engineer states:
		 * 0 - Approaching
		 * 1 - Collapsed
		 * 2 - Shivering
		 * 3 - Sleeping
		 * 4 - Helping
		 */
		if($SM.get('game.engineer.level') >= 0 && $SM.get('game.engineer.level') < 3) {
			Room._engineerTimer = Engine.setTimeout(Room.updateengineerState, Room._engineer_STATE_DELAY);
		}
		if($SM.get('game.engineer.level') == 1 && $SM.get('stores.energy', true) < 0) {
			Engine.setTimeout(Room.unlockForest, Room._NEED_energy_DELAY);
		}
		Engine.setTimeout($SM.collectIncome, 1000);

		Notifications.notify(Room, _("the hab is {0}", Room.TempEnum.fromInt($SM.get('game.temperature.value')).text));
		Notifications.notify(Room, _("the air in the hab is {0}", Room.FireEnum.fromInt($SM.get('game.fire.value')).text));
	},
	
	options: {}, // Nothing for now
	
	onArrival: function(transition_diff) {
		Room.setTitle();
		if(Room.changed) {
			Notifications.notify(Room, _("the air in the hab is {0}", Room.FireEnum.fromInt($SM.get('game.fire.value')).text));
			Notifications.notify(Room, _("the hab is {0}", Room.TempEnum.fromInt($SM.get('game.temperature.value')).text));
			Room.changed = false;
		}
		if($SM.get('game.engineer.level') == 3) {
			$SM.add('game.engineer.level', 1);
			$SM.setIncome('engineer', {
				delay: 10,
				stores: {'energy' : 2 }
			});
			Room.updateIncomeView();
			Notifications.notify(Room, _("the enginer wakes up form stasus takeing in the situation"));
		}

		Engine.moveStoresView(null, transition_diff);
	},
	
	TempEnum: {
		fromInt: function(value) {
			for(var k in this) {
				if(typeof this[k].value != 'undefined' && this[k].value == value) {
					return this[k];
				}
			}
			return null;
		},
		Claustrophobic: { value: 0, text: _('claustrophobic') },
		Uncomfortable: { value: 1, text: _('uncomfortable') },
		Snug: { value: 2, text: _('snug') },
		Comfortable: { value: 3, text: _('comfortable') },
		Cushy: { value: 4, text: _('cushy') }
	},
	
	FireEnum: {
		fromInt: function(value) {
			for(var k in this) {
				if(typeof this[k].value != 'undefined' && this[k].value == value) {
					return this[k];
				}
			}
			return null;
		},
		Dead: { value: 0, text: _('hazardous') },
		Smoldering: { value: 1, text: _('hard to breath') },
		Flickering: { value: 2, text: _('stuffy') },
		Burning: { value: 3, text: _('good') },
		Roaring: { value: 4, text: _('crystal clear') }
	},
	
	setTitle: function() {
		var title = $SM.get('game.fire.value') < 2 ? _("Flight Controls") : _("The Landing Hab");
		//document.body.style.backgroundImage = "url('deadgameproject.png')";
		//hear
		if(Engine.activeModule == this) {
			document.title = title;
		}
		$('div#location_room').text(title);
	},
	
	updateButton: function() {
		var light = $('#lightButton.button');
		var stoke = $('#stokeButton.button');
		if($SM.get('game.fire.value') == Room.FireEnum.Dead.value && stoke.css('display') != 'none') {
			stoke.hide();
			light.show();
			if(stoke.hasClass('disabled')) {
				Button.cooldown(light);
			}
		} else if(light.css('display') != 'none') {
			stoke.show();
			light.hide();
			if(light.hasClass('disabled')) {
				Button.cooldown(stoke);
			}
		}
		
		if(!$SM.get('stores.energy')) {
			light.addClass('free');
			stoke.addClass('free');
		} else {
			light.removeClass('free');
			stoke.removeClass('free');
		}
	},
	
	_fireTimer: null,
	_tempTimer: null,
	lightFire: function() {
		var energy = $SM.get('stores.energy');
		if(energy < 5) {
			Notifications.notify(Room, _("not enough energy to get the fire going"));
			Button.clearCooldown($('#lightButton.button'));
			return;
		} else if(energy > 4) {
			$SM.set('stores.energy', energy - 5);
		}
		$SM.set('game.fire', Room.FireEnum.Burning);
		Room.onFireChange();
	},
	
	stokeFire: function() {
		var energy = $SM.get('stores.energy');
		if(energy === 0) {
			Notifications.notify(Room, _("the energy has run out"));
			Button.clearCooldown($('#stokeButton.button'));
			return;
		}
		if(energy > 0) {
			$SM.set('stores.energy', energy - 1);
		}
		if($SM.get('game.fire.value') < 4) {
			$SM.set('game.fire', Room.FireEnum.fromInt($SM.get('game.fire.value') + 1));
		}
		Room.onFireChange();
	},
	
	onFireChange: function() {
		if(Engine.activeModule != Room) {
			Room.changed = true;
		}
		Notifications.notify(Room, _("the air is {0}", Room.FireEnum.fromInt($SM.get('game.fire.value')).text), true);
		if($SM.get('game.fire.value') > 1 && $SM.get('game.engineer.level') < 0) {
			$SM.set('game.engineer.level', 0);
			Notifications.notify(Room, _("you start to get your bearings looks like you crashed near the base of an extinct volcano"));
			Engine.setTimeout(Room.updateengineerState, Room._engineer_STATE_DELAY);
		}	
		window.clearTimeout(Room._fireTimer);
		Room._fireTimer = Engine.setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
		Room.updateButton();
		Room.setTitle();
	},
	
	coolFire: function() {
		var energy = $SM.get('stores.energy');
		if($SM.get('game.fire.value') <= Room.FireEnum.Flickering.value &&
			$SM.get('game.engineer.level') > 3 && energy > 0) {
			Notifications.notify(Room, _("engineer runs the CO2 scrubbers"), true);
			$SM.set('stores.energy', energy - 1);
			$SM.set('game.fire',Room.FireEnum.fromInt($SM.get('game.fire.value') + 1));
		}
		if($SM.get('game.fire.value') > 0) {
			$SM.set('game.fire',Room.FireEnum.fromInt($SM.get('game.fire.value') - 1));
			Room._fireTimer = Engine.setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
			Room.onFireChange();
		}
	},
	
	adjustTemp: function() {
		var old = $SM.get('game.temperature.value');
		if($SM.get('game.temperature.value') > 0 && $SM.get('game.temperature.value') > $SM.get('game.fire.value')) {
			$SM.set('game.temperature',Room.TempEnum.fromInt($SM.get('game.temperature.value') - 1));
			Notifications.notify(Room, _("the hab is {0}" , Room.TempEnum.fromInt($SM.get('game.temperature.value')).text), true);
		}
		if($SM.get('game.temperature.value') < 4 && $SM.get('game.temperature.value') < $SM.get('game.fire.value')) {
			$SM.set('game.temperature', Room.TempEnum.fromInt($SM.get('game.temperature.value') + 1));
			Notifications.notify(Room, _("the hab is {0}" , Room.TempEnum.fromInt($SM.get('game.temperature.value')).text), true);
		}
		if($SM.get('game.temperature.value') != old) {
			Room.changed = true;
		}
		Room._tempTimer = Engine.setTimeout(Room.adjustTemp, Room._ROOM_COMFORTABLE_DELAY);
	},
	
	unlockForest: function() {
		$SM.set('stores.energy', 4);
		Outside.init();
		Notifications.notify(Room, _("dust storms rage outside"));
		Notifications.notify(Room, _("power is running low"));
		Engine.event('progress', 'outside');
	},
	
	updateengineerState: function() {
		var lengineer = $SM.get('game.engineer.level');
		if(lengineer === 0) {
			Notifications.notify(Room, _("you find a stasis pod in the hab and think you recognise one of the ships enginers inside."));
			lengineer = $SM.setget('game.engineer.level', 1);
			Engine.setTimeout(Room.unlockForest, Room._NEED_energy_DELAY);
		} 
		else if(lengineer < 3 && $SM.get('game.temperature.value') >= Room.TempEnum.Comfortable.value) {
			var msg = "";
			switch(lengineer) {
			case 1:
				msg = _("you tell the pod to wake the enginer out of her stasis.");
				break;
			case 2:
				msg = _("the pod wakes the enginer out of stasis");
				break;
			}
			Notifications.notify(Room, msg);
			if(lengineer < 3) {
				lengineer = $SM.setget('game.engineer.level', lengineer + 1);
			}
		}
		if(lengineer < 3) {
			Engine.setTimeout(Room.updateengineerState, Room._engineer_STATE_DELAY);
		}
		Engine.saveGame();
	},
	
	updateStoresView: function() {
		var stores = $('div#stores');
		var resources = $('div#resources');
		var special = $('div#special');
		var weapons = $('div#weapons');
		var needsAppend = false, rNeedsAppend = false, sNeedsAppend = false, wNeedsAppend = false, newRow = false;
		if(stores.length === 0) {
			stores = $('<div>').attr({
				'id': 'stores',
				'data-legend': _('stores')
			}).css('opacity', 0);
			needsAppend = true;
		}
		if(resources.length === 0) {
			resources = $('<div>').attr({
				id: 'resources'
			}).css('opacity', 0);
			rNeedsAppend = true;
		}
		if(special.length === 0) {
			special = $('<div>').attr({
				id: 'special'
			}).css('opacity', 0);
			sNeedsAppend = true;
		}
		if(weapons.length === 0) {
			weapons = $('<div>').attr({
				'id': 'weapons',
				'data-legend': _('weapons')
			}).css('opacity', 0);
			wNeedsAppend = true;
		}
		for(var k in $SM.get('stores')) {
			
			var type = null;
			if(Room.Craftables[k]) {
				type = Room.Craftables[k].type;
			} else if(Room.TradeGoods[k]) {
				type = Room.TradeGoods[k].type;
			} else if (Room.MiscItems[k]) {
				type = Room.MiscItems[k].type;
			}
			
			var location;
			switch(type) {
			case 'upgrade':
				// Don't display upgrades on the Room screen
				continue;
			case 'building':
				// Don't display buildings either
				continue;
			case 'weapon':
				location = weapons;
				break;
			case 'special':
				location = special;
				break;
			default:
				location = resources;
				break;
			}
			
			var id = "row_" + k.replace(' ', '-');
			var row = $('div#' + id, location);
			var num = $SM.get('stores["'+k+'"]');
			
			if(typeof num != 'number' || isNaN(num)) {
				// No idea how counts get corrupted, but I have reason to believe that they occassionally do.
				// Build a little fence around it!
				num = 0;
				$SM.set('stores["'+k+'"]', 0);
			}
			
			var lk = _(k);
			
			// thieves?
			if(typeof $SM.get('game.thieves') == 'undefined' && num > 5000 && $SM.get('features.location.world')) {
				$SM.startThieves();
			}
			
			if(row.length === 0) {
				row = $('<div>').attr('id', id).addClass('storeRow');
				$('<div>').addClass('row_key').text(lk).appendTo(row);
				$('<div>').addClass('row_val').text(Math.floor(num)).appendTo(row);
				$('<div>').addClass('clear').appendTo(row);
				var curPrev = null;
				location.children().each(function(i) {
					var child = $(this);
					var cName = child.children('.row_key').text();
					if(cName < lk) {
						curPrev = child.attr('id');
					}
				});
				if(curPrev == null) {
					row.prependTo(location);
				} else {
					row.insertAfter(location.find('#' + curPrev));
				}
				newRow = true;
			} else {
				$('div#' + row.attr('id') + ' > div.row_val', location).text(Math.floor(num));
			}
		}
				
		if(rNeedsAppend && resources.children().length > 0) {
			resources.prependTo(stores);
			resources.animate({opacity: 1}, 300, 'linear');
		}
		
		if(sNeedsAppend && special.children().length > 0) {
			special.appendTo(stores);
			special.animate({opacity: 1}, 300, 'linear');
		}
		
		if(needsAppend && stores.find('div.storeRow').length > 0) {
			stores.appendTo('div#storesContainer');
			stores.animate({opacity: 1}, 300, 'linear');
		}
		
		if(wNeedsAppend && weapons.children().length > 0) {
			weapons.appendTo('div#storesContainer');
			weapons.animate({opacity: 1}, 300, 'linear');
		}
		
		if(newRow) {
			Room.updateIncomeView();
		}

		if($("div#outsidePanel").length) {
			Outside.updateSettlement();
		}

		if($SM.get('stores.SolarRover') && !Room.pathDiscovery){
			Room.pathDiscovery = true;
			Path.openPath();
		}
	},
	
	updateIncomeView: function() {
		var stores = $('div#resources');
		var totalIncome = {};
		if(stores.length === 0 || typeof $SM.get('income') == 'undefined') return;
		$('div.storeRow', stores).each(function(index, el) {
			el = $(el);
			$('div.tooltip', el).remove();
			var ttPos = index > 10 ? 'top right' : 'bottom right';
			var tt = $('<div>').addClass('tooltip ' + ttPos);
			var storeName = el.attr('id').substring(4).replace('-', ' ');
			for(var incomeSource in $SM.get('income')) {
				var income = $SM.get('income["'+incomeSource+'"]');
				for(var store in income.stores) {
					if(store == storeName && income.stores[store] !== 0) {
						$('<div>').addClass('row_key').text(_(incomeSource)).appendTo(tt);
						$('<div>')
							.addClass('row_val')
							.text(Engine.getIncomeMsg(income.stores[store], income.delay))
							.appendTo(tt);
						if (!totalIncome[store] || totalIncome[store].income === undefined) {
							totalIncome[store] = { income: 0 };
						}
						totalIncome[store].income += Number(income.stores[store]);
						totalIncome[store].delay = income.delay;
					}
				}
			}
			if(tt.children().length > 0) {
				var total = totalIncome[storeName].income;
				$('<div>').addClass('total row_key').text(_('total')).appendTo(tt);
				$('<div>').addClass('total row_val').text(Engine.getIncomeMsg(total, totalIncome[storeName].delay)).appendTo(tt);
				tt.appendTo(el);
			}
		});
	},
	
	buy: function(buyBtn) {
		var thing = $(buyBtn).attr('buildThing');
		var good = Room.TradeGoods[thing];
		var numThings = $SM.get('stores["'+thing+'"]', true);
		if(numThings < 0) numThings = 0;
		if(good.maximum <= numThings) {
			return;
		}
		
		var storeMod = {};
		var cost = good.cost();
		for(var k in cost) {
			var have = $SM.get('stores["'+k+'"]', true);
			if(have < cost[k]) {
				Notifications.notify(Room, _("not enough " + k));
				return false;
			} else {
				storeMod[k] = have - cost[k];
			}
		}
		$SM.setM('stores', storeMod);
		
		Notifications.notify(Room, good.buildMsg);
		
		$SM.add('stores["'+thing+'"]', 1);
	},
	
	build: function(buildBtn) {
		var thing = $(buildBtn).attr('buildThing');
		if($SM.get('game.temperature.value') <= Room.TempEnum.Uncomfortable.value) {
			Notifications.notify(Room, _("engineer just shivers"));
			return false;
		}
		var craftable = Room.Craftables[thing];
		
		var numThings = 0; 
		switch(craftable.type) {
		case 'good':
		case 'weapon':
		case 'tool':
		case 'upgrade':
			numThings = $SM.get('stores["'+thing+'"]', true);
			break;
		case 'building':
			numThings = $SM.get('game.buildings["'+thing+'"]', true);
			break;
		}
		
		if(numThings < 0) numThings = 0;
		if(craftable.maximum <= numThings) {
			return;
		}
		
		var storeMod = {};
		var cost = craftable.cost();
		for(var k in cost) {
			var have = $SM.get('stores["'+k+'"]', true);
			if(have < cost[k]) {
				Notifications.notify(Room, _("not enough "+k));
				return false;
			} else {
				storeMod[k] = have - cost[k];
			}
		}
		$SM.setM('stores', storeMod);
		
		Notifications.notify(Room, craftable.buildMsg);
		
		switch(craftable.type) {
		case 'good':
		case 'weapon':
		case 'upgrade':
		case 'tool':
			$SM.add('stores["'+thing+'"]', 1);
			break;
		case 'building':
			$SM.add('game.buildings["'+thing+'"]', 1);
			break;
		}		
	},
	
	needsWorkshop: function(type) {
		return type == 'weapon' || type == 'upgrade' || type =='tool';
	},
	
	craftUnlocked: function(thing) {
		if(Room.buttons[thing]) {
			return true;
		}
		if($SM.get('game.engineer.level') < 4) return false;
		var craftable = Room.Craftables[thing];
		if(Room.needsWorkshop(craftable.type) && $SM.get('game.buildings["'+'workshop'+'"]', true) === 0) return false;
		var cost = craftable.cost();
		
		//show button if one has already been built
		if($SM.get('game.buildings["'+thing+'"]') > 0){
			Room.buttons[thing] = true;
			return true;
		}
		// Show buttons if we have at least 1/2 the energy, and all other components have been seen.
		if($SM.get('stores.energy', true) < cost['energy'] * 0.5) {
			return false;
		}
		for(var c in cost) {
			if(!$SM.get('stores["'+c+'"]')) {
				return false;
			}
		}
		
		Room.buttons[thing] = true;
		//don't notify if it has already been built before
		if(!$SM.get('game.buildings["'+thing+'"]')){
			Notifications.notify(Room, craftable.availableMsg);
		}
		return true;
	},
	
	buyUnlocked: function(thing) {
		if(Room.buttons[thing]) {
			return true;
		} else if($SM.get('game.buildings["trading post"]', true) > 0) {
			if(thing == 'SolarRover' || typeof $SM.get('stores["'+thing+'"]') != 'undefined') {
				// Allow the purchase of stuff once you've seen it
				return true;
			}
		}
		return false;
	},
	
	updateBuildButtons: function() {
		var buildSection = $('#buildBtns');
		var needsAppend = false;
		if(buildSection.length === 0) {
			buildSection = $('<div>').attr({'id': 'buildBtns', 'data-legend': _('build:')}).css('opacity', 0);
			needsAppend = true;
		}
		
		var craftSection = $('#craftBtns');
		var cNeedsAppend = false;
		if(craftSection.length === 0 && $SM.get('game.buildings["workshop"]', true) > 0) {
			craftSection = $('<div>').attr({'id': 'craftBtns', 'data-legend': _('craft:')}).css('opacity', 0);
			cNeedsAppend = true;
		}
		
		var buySection = $('#buyBtns');
		var bNeedsAppend = false;
		if(buySection.length === 0 && $SM.get('game.buildings["trading post"]', true) > 0) {
			buySection = $('<div>').attr({'id': 'buyBtns', 'data-legend': _('buy:')}).css('opacity', 0);
			bNeedsAppend = true;
		}
		
		for(var k in Room.Craftables) {
			craftable = Room.Craftables[k];
			var max = $SM.num(k, craftable) + 1 > craftable.maximum;
			if(craftable.button == null) {
				if(Room.craftUnlocked(k)) {
					var loc = Room.needsWorkshop(craftable.type) ? craftSection : buildSection;
					craftable.button = new Button.Button({
						id: 'build_' + k,
						cost: craftable.cost(),
						text: _(k),
						click: Room.build,
						width: '80px',
						ttPos: loc.children().length > 10 ? 'top right' : 'bottom right'
					}).css('opacity', 0).attr('buildThing', k).appendTo(loc).animate({opacity: 1}, 300, 'linear');
				}
			} else {
				// refresh the tooltip
				var costTooltip = $('.tooltip', craftable.button);
				costTooltip.empty();
				var cost = craftable.cost();
				for(var c in cost) {
					$("<div>").addClass('row_key').text(_(c)).appendTo(costTooltip);
					$("<div>").addClass('row_val').text(cost[c]).appendTo(costTooltip);
				}
				if(max && !craftable.button.hasClass('disabled')) {
					Notifications.notify(Room, craftable.maxMsg);
				}
			}
			if(max) {
				Button.setDisabled(craftable.button, true);
			} else {
				Button.setDisabled(craftable.button, false);
			}
		}
		
		for(var g in Room.TradeGoods) {
			good = Room.TradeGoods[g];
			var goodsMax = $SM.num(g, good) + 1 > good.maximum;
			if(good.button == null) {
				if(Room.buyUnlocked(g)) {
					good.button = new Button.Button({
						id: 'build_' + g,
						cost: good.cost(),
						text: _(g),
						click: Room.buy,
						width: '80px',
						ttPos: buySection.children().length > 10 ? 'top right' : 'bottom right'
					}).css('opacity', 0).attr('buildThing', g).appendTo(buySection).animate({opacity:1}, 300, 'linear');
				}
			} else {
				// refresh the tooltip
				var goodsCostTooltip = $('.tooltip', good.button);
				goodsCostTooltip.empty();
				var goodCost = good.cost();
				for(var gc in goodCost) {
					$("<div>").addClass('row_key').text(_(gc)).appendTo(goodsCostTooltip);
					$("<div>").addClass('row_val').text(goodCost[gc]).appendTo(goodsCostTooltip);
				}
				if(goodsMax && !good.button.hasClass('disabled')) {
					Notifications.notify(Room, good.maxMsg);
				}
			}
			if(goodsMax) {
				Button.setDisabled(good.button, true);
			} else {
				Button.setDisabled(good.button, false);
			}
		}
		
		if(needsAppend && buildSection.children().length > 0) {
			buildSection.appendTo('div#roomPanel').animate({opacity: 1}, 300, 'linear');
		}
		if(cNeedsAppend && craftSection.children().length > 0) {
			craftSection.appendTo('div#roomPanel').animate({opacity: 1}, 300, 'linear');
		}
		if(bNeedsAppend && buildSection.children().length > 0) {
			buySection.appendTo('div#roomPanel').animate({opacity: 1}, 300, 'linear');
		}
	},
	
	SolarRoverTooltip: function(direction){
		var ttPos = $('div#resources').children().length > 10 ? 'top right' : 'bottom right';
		var tt = $('<div>').addClass('tooltip ' + ttPos);
		$('<div>').addClass('row_key').text(_('the solarrover points '+ direction)).appendTo(tt);
		tt.appendTo($('#row_SolarRover'));
	},
	
	handleStateUpdates: function(e){
		if(e.category == 'stores'){
			Room.updateStoresView();
			Room.updateBuildButtons();
		} else if(e.category == 'income'){
			Room.updateStoresView();
			Room.updateIncomeView();
		} else if(e.stateName.indexOf('game.buildings') === 0){
			Room.updateBuildButtons();
		}
	}
};
