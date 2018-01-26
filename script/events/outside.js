/**
 * Events that can occur when the Outside module is active
 **/
Events.Outside = [
	{ /* Ruined traps */
	title: _('A Ruined Trap'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.buildings["bug trap"]', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					_('some of the traps have been torn apart.'),
					_('large prints lead away, into the distance.')
				],
				onLoad: function() {
					var numWrecked = Math.floor(Math.random() * $SM.get('game.buildings["bug trap"]', true)) + 1;
					$SM.add('game.buildings["bug trap"]', -numWrecked);
					Outside.updateSettlement();
					Outside.updateTrapButton();
				},
				notification: _('some traps have been destroyed'),
				blink: true,
				buttons: {
					'track': {
						text: _('track them'),
						nextScene: {0.5: 'nothing', 1: 'catch'}
					},
					'ignore': {
						text: _('ignore them'),
						nextScene: 'end'
					}
				}
			},
			'nothing': {
				text: [
					_('the tracks disappear after just a few minutes.'),
					_('the area is silent.')
				],
				notification: _('nothing was found'),
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			},
			'catch': {
				text: [
					_('not far from the hub lies a unusually large insect, its shells is damaged and it looks injured.'),
					_('it puts up little resistance before the knife.')
				],
				notification: _('there was a giant bug. it\'s dead now'),
				reward: {
					shells: 100,
					meat: 100,
					spines: 10
				},
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			}
		}
	},
	{ /* Hut fire */
		title: _('Cave in'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.buildings["bunker"]', true) > 0 && $SM.get('game.population', true) > 50;
		},
		scenes: {
			'start': {
				text: [
					_('cave in ocurs in one of the larva tubs, destroying a bunker.'),
					_('all residents in the bunker perished or had to go back into there pods to recover.')
				],
				notification: _('a cave in has happened'),
				blink: true,
				onLoad: function() {
					Outside.destroyHuts(1);
				},
				buttons: {
					'mourn': {
						text: _('mourn'),
						notification: _('some of the crew where knocked out so you put them back in the pods to recover'),
						nextScene: 'end'
					}
				}
			}
		}
	},
	{ /* Sickness */
		title: _('Sickness'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 10 && $SM.get('game.population', true) < 50 && $SM.get('stores.medicine', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					_('a sickness is spreading between the astronauts.'),
					_('medicine is needed immediately.')
				],
				notification: _('some astonaughts are ill'),
				blink: true,
				buttons: {
					'heal': {
						text: _('1 medicine'),
						cost: { 'medicine' : 1 },
						nextScene: {1: 'healed'}
					},
					'ignore': {
						text: _('ignore it'),
						nextScene: {1: 'death'}
					}
				}
			},
			'healed': {
				text: [
					_('the sickness is cured in time.')
				],
				notification: _('sufferers are healed'),
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			},
			'death': {
				text: [
					_('the sickness is spreading between the astronauts.'),
					_('the days are spent with burials.'),
					_('the nights are rent with screams.')
				],
				notification: _('sufferers are left to die'),
				onLoad: function() {
					var numKilled = Math.floor(Math.random() * Math.floor($SM.get('game.population', true)/2)) + 1;
					Outside.killCrew(numKilled);
				},
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			}
		}
	},

	{ /* Plague */
		title: _('Plague'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 50 && $SM.get('stores.medicine', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					_('a terrible plague is fast spreading between the astronauts.'),
					_('medicine is needed immediately.')
				],
				notification: _('a plague afflicts the astronauts'),
				blink: true,
				buttons: {
					/* Because there is a serious need for medicine, the price is raised. */
					'buyMedicine': {
						text: _('buy medicine'),
						cost: { 'scales': 70,
								'spines': 50 },
						reward: { 'medicine': 1 }
					},
					'heal': {
						text: _('5 medicine'),
						cost: { 'medicine' : 5 },
						nextScene: {1: 'healed'}
					},
					'ignore': {
						text: _('do nothing'),
						nextScene: {1: 'death'}
					}
				}
			},
			'healed': {
				text: [
					_('the plague is kept from spreading.'),
					_('only a few die.'),
					_('the rest bury them.')
				],
				notification: _('epidemic is eradicated eventually'),
				onLoad: function() {
					var numKilled = Math.floor(Math.random() * 5) + 2;
					Outside.killCrew(numKilled);
				},
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			},
			'death': {
				text: [
					_('the plague rips through the crew.'),
					_('the nights are rent with screams.'),
					_('the only hope is a quick death.')
				],
				notification: _('population is almost exterminated'),
				onLoad: function() {
					var numKilled = Math.floor(Math.random() * 80) + 10;
					Outside.killCrew(numKilled);
				},
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			}
		}
	},

	{ /* insect attack */
		title: _('The Swarm'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					 _('a swarm of large insects emerges from the ground.'),
					 _('the fight is short and bloody, but the bugs are repelled.'),
					 _('the crew retreat to mourn the dead and put the injured in stasis pods to recover.')
				],
				notification: _('a swarm of sand worms attack the tunnels'),
				onLoad: function() {
					var numKilled = Math.floor(Math.random() * 10) + 1;
					Outside.killCrew(numKilled);
				},
				reward: {
					shells: 100,
					meat: 100,
					spines: 10
				},
				blink: true,
				buttons: {
					'end': {
						text: _('go home'),
						notification: _('predators become prey. price is unfair'),
						nextScene: 'end'
					}
				}
			}
		}
	},

	{ /* Soldier attack */
		title: _('The Insects Raid'),
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 0 && $SM.get('game.cityCleared');
		},
		scenes: {
			'start': {
				text: [
					_('a tremer draws near.'),
					_('a large sand worm emerges from the martion soil.'),
					_('together you manage to drive it away but not without losses.')
				],
				notification: _('a large sand worm emerges'),
				onLoad: function() {
					var numKilled = Math.floor(Math.random() * 40) + 1;
					Outside.killCrew(numKilled);
				},
				reward: {
					/*bullets: 10,*/
					'ration packs': 50
				},

				blink: true,
				buttons: {
					'end': {
						text: _('go home'),
						notification: _('mars can be a dangorose place'),
						nextScene: 'end'
					}
				}
			}
		}
	}

];
