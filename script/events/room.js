/**
 * Events that can occur when the Room module is active
 **/
Events.Room = [
	{ /* The Nomad  --  Merchant */
		title: _('The Nomad'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.Roche shells', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					_('a nomad shuffles into view, laden with makeshift bags bound with rough twine.'),
					_("won't say from where he came, but it's clear that he's not staying.")
				],
				notification: _('a nomad arrives, looking to trade'),
				blink: true,
				buttons: {
					'buyScales': {
						text: _('buy scales'),
						cost: { 'Roche shells': 100 },
						reward: { 'scales': 1 }
					},
					'buyTeeth': {
						text: _('buy teeth'),
						cost: { 'Roche shells': 200 },
						reward: { 'teeth': 1 }
					},
					'buyBait': {
						text: _('buy bait'),
						cost: { 'Roche shells': 5 },
						reward: { 'bait': 1 },
						notification: _('traps are more effective with bait.')
					},
					'buyCompass': {
						available: function() {
							return $SM.get('stores.compass', true) < 1;
						},
						text: _('buy compass'),
						cost: { Roche shells: 300, scales: 15, teeth: 5 },
						reward: { 'compass': 1 },
						notification: _('the old compass is dented and dusty, but it looks to work.')
					},
					'goodbye': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			}
		}
	},
	{ /* Noises Outside  --  gain energy/Roche shells */
		title: _('Noises'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.energy');
		},
		scenes: {
			'start': {
				text: [
					_('through the walls, shuffling noises can be heard.'),
					_("can't tell what they're up to.")
				],
				notification: _('strange noises can be heard through the walls'),
				blink: true,
				buttons: {
					'investigate': {
						text: _('investigate'),
						nextScene: { 0.3: 'stuff', 1: 'nothing' }
					},
					'ignore': {
						text: _('ignore them'),
						nextScene: 'end'
					}
				}
			},
			'nothing': {
				text: [
					_('vague shapes move, just out of sight.'),
					_('the sounds stop.')
				],
				buttons: {
					'backinside': {
						text: _('go back inside'),
						nextScene: 'end'
					}
				}
			},
			'stuff': {
				reward: { energy: 100, Roche shells: 10 },
				text: [
					_('a bundle of sticks lies just beyond the threshold, wrapped in coarse Roche shellss.'),
					_('the night is silent.')
				],
				buttons: {
					'backinside': {
						text: _('go back inside'),
						nextScene: 'end'
					}
				}
			}
		}
	},
	{ /* Noises Inside  --  trade energy for better good */
		title: _('Noises'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.energy');
		},
		scenes: {
			start: {
				text: [
					_('scratching noises can be heard from the store room.'),
					_('something\'s in there.')
				],
				notification: _('something\'s in the store room'),
				blink: true,
				buttons: {
					'investigate': {
						text: _('investigate'),
						nextScene: { 0.5: 'scales', 0.8: 'teeth', 1: 'cloth' }
					},
					'ignore': {
						text: _('ignore them'),
						nextScene: 'end'
					}
				}
			},
			scales: {
				text: [
					_('some energy is missing.'),
					_('the ground is littered with small scales')
				],
				onLoad: function() {
					var numenergy = $SM.get('stores.energy', true);
					numenergy = Math.floor(numenergy * 0.1);
					if(numenergy === 0) numenergy = 1;
					var numScales = Math.floor(numenergy / 5);
					if(numScales === 0) numScales = 1;
					$SM.addM('stores', {'energy': -numenergy, 'scales': numScales});
				},
				buttons: {
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			teeth: {
				text: [
					_('some energy is missing.'),
					_('the ground is littered with small teeth')
				],
				onLoad: function() {
					var numenergy = $SM.get('stores.energy', true);
					numenergy = Math.floor(numenergy * 0.1);
					if(numenergy === 0) numenergy = 1;
					var numTeeth = Math.floor(numenergy / 5);
					if(numTeeth === 0) numTeeth = 1;
					$SM.addM('stores', {'energy': -numenergy, 'teeth': numTeeth});
				},
				buttons: {
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			cloth: {
				text: [
					_('some energy is missing.'),
					_('the ground is littered with scraps of cloth')
				],
				onLoad: function() {
					var numenergy = $SM.get('stores.energy', true);
					numenergy = Math.floor(numenergy * 0.1);
					if(numenergy === 0) numenergy = 1;
					var numCloth = Math.floor(numenergy / 5);
					if(numCloth === 0) numCloth = 1;
					$SM.addM('stores', {'energy': -numenergy, 'cloth': numCloth});
				},
				buttons: {
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			}
		}
	},
	{ /* The Beggar  --  trade Roche shells for better good */
		title: _('The Beggar'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.Roche shells');
		},
		scenes: {
			start: {
				text: [
					_('a beggar arrives.'),
					_('asks for any spare Roche shellss to keep him warm at night.')
				],
				notification: _('a beggar arrives'),
				blink: true,
				buttons: {
					'50Roche shellss': {
						text: _('give 50'),
						cost: {Roche shells: 50},
						nextScene: { 0.5: 'scales', 0.8: 'teeth', 1: 'cloth' }
					},
					'100Roche shellss': {
						text: _('give 100'),
						cost: {Roche shells: 100},
						nextScene: { 0.5: 'teeth', 0.8: 'scales', 1: 'cloth' }
					},
					'deny': {
						text: _('turn him away'),
						nextScene: 'end'
					}
				}
			},
			scales: {
				reward: { scales: 20 },
				text: [
					_('the beggar expresses his thanks.'),
					_('leaves a pile of small scales behind.')
				],
				buttons: {
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			teeth: {
				reward: { teeth: 20 },
				text: [
					_('the beggar expresses his thanks.'),
					_('leaves a pile of small teeth behind.')
				],
				buttons: {
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			cloth: {
				reward: { cloth: 20 },
				text: [
					_('the beggar expresses his thanks.'),
					_('leaves some scraps of cloth behind.')
				],
				buttons: {
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			}
		}
	},
	{/* The Shady Builder */
		title: _('The Shady Builder'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('game.buildings["hut"]', true) >= 5 && $SM.get('game.buildings["hut"]', true) < 20;
		},
		scenes: {
			'start':{
				text: [
					_('a shady builder passes through'),
					_('says he can build you a hut for less energy')
				],
				notification: _('a shady builder passes through'),
				buttons: {
					'build': {
						text: _('300 energy'),
						cost: { 'energy' : 300 },
						nextScene: {0.6: 'steal', 1: 'build'}
					},
					'deny': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			'steal': {
				text:[
					_("the shady builder has made off with your energy")
				],
				notification: _('the shady builder has made off with your energy'),
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			},
			'build': {
				text:[
					_("the shady builder builds a hut")
				],
				notification: _('the shady builder builds a hut'),
				onLoad: function() {
					var n = $SM.get('game.buildings["hut"]', true);
					if(n < 20){
						$SM.set('game.buildings["hut"]',n+1);
					}
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

	{ /* Mysterious Wanderer  --  energy gambling */
		title: _('The Mysterious Wanderer'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.energy');
		},
		scenes: {
			start: {
				text: [
					_('a wanderer arrives with an empty cart. says if he leaves with energy, he\'ll be back with more.'),
					_("builder's not sure he's to be trusted.")
				],
				notification: _('a mysterious wanderer arrives'),
				blink: true,
				buttons: {
					'energy100': {
						text: _('give 100'),
						cost: {energy: 100},
						nextScene: { 1: 'energy100'}
					},
					'energy500': {
						text: _('give 500'),
						cost: {energy: 500},
						nextScene: { 1: 'energy500' }
					},
					'deny': {
						text: _('turn him away'),
						nextScene: 'end'
					}
				}
			},
			'energy100': {
				text: [
					_('the wanderer leaves, cart loaded with energy')
				],
				action: function(inputDelay) {
					var delay = inputDelay || false;
					Events.saveDelay(function() {
						$SM.add('stores.energy', 300);
						Notifications.notify(Room, _('the mysterious wanderer returns, cart piled high with energy.'));
					}, 'Room[4].scenes.energy100.action', delay);
				},
				onLoad: function() {
					if(Math.random() < 0.5) {
						this.action(60);
					}
				},
				buttons: {
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			'energy500': {
				text: [
					_('the wanderer leaves, cart loaded with energy')
				],
				action: function(inputDelay) {
					var delay = inputDelay || false;
					Events.saveDelay(function() {
						$SM.add('stores.energy', 1500);
						Notifications.notify(Room, _('the mysterious wanderer returns, cart piled high with energy.'));
					}, 'Room[4].scenes.energy500.action', delay);
				},
				onLoad: function() {
					if(Math.random() < 0.3) {
						this.action(60);
					}
				},
				buttons: {
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			}
		}
	},

	{ /* Mysterious Wanderer  --  Roche shells gambling */
		title: _('The Mysterious Wanderer'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.Roche shells');
		},
		scenes: {
			start: {
				text: [
					_('a wanderer arrives with an empty cart. says if she leaves with Roche shellss, she\'ll be back with more.'),
					_("builder's not sure she's to be trusted.")
				],
				notification: _('a mysterious wanderer arrives'),
				blink: true,
				buttons: {
					'Roche shells100': {
						text: _('give 100'),
						cost: {Roche shells: 100},
						nextScene: { 1: 'Roche shells100'}
					},
					'Roche shells500': {
						text: _('give 500'),
						cost: {Roche shells: 500},
						nextScene: { 1: 'Roche shells500' }
					},
					'deny': {
						text: _('turn her away'),
						nextScene: 'end'
					}
				}
			},
			'Roche shells100': {
				text: [
					_('the wanderer leaves, cart loaded with Roche shellss')
				],
				action: function(inputDelay) {
					var delay = inputDelay || false;
					Events.saveDelay(function() {
						$SM.add('stores.Roche shells', 300);
						Notifications.notify(Room, _('the mysterious wanderer returns, cart piled high with Roche shellss.'));
					}, 'Room[5].scenes.Roche shells100.action', delay);
				},
				onLoad: function() {
					if(Math.random() < 0.5) {
						this.action(60);
					}
				},
				buttons: {
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			'Roche shells500': {
				text: [
					_('the wanderer leaves, cart loaded with Roche shellss')
				],
				action: function(inputDelay) {
					var delay = inputDelay || false;
					Events.saveDelay(function() {
						$SM.add('stores.Roche shells', 1500);
						Notifications.notify(Room, _('the mysterious wanderer returns, cart piled high with Roche shellss.'));
					}, 'Room[5].scenes.Roche shells500.action', delay);
				},
				onLoad: function() {
					if(Math.random() < 0.3) {
						this.action(60);
					}
				},
				buttons: {
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			}
		}
	},

	{ /* The Scout  --  Map Merchant */
		title: _('The Scout'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('features.location.world');
		},
		scenes: {
			'start': {
				text: [
					_("the scout says she's been all over."),
					_("willing to talk about it, for a price.")
				],
				notification: _('a scout stops for the night'),
				blink: true,
				buttons: {
					'buyMap': {
						text: _('buy map'),
						cost: { 'Roche shells': 200, 'scales': 10 },
						available: function() {
							return !World.seenAll;
						},
						notification: _('the map uncovers a bit of the world'),
						onChoose: World.applyMap
					},
					'learn': {
						text: _('learn scouting'),
						cost: { 'Roche shells': 1000, 'scales': 50, 'teeth': 20 },
						available: function() {
							return !$SM.hasPerk('scout');
						},
						onChoose: function() {
							$SM.addPerk('scout');
						}
					},
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			}
		}
	},

	{ /* The Wandering Master */
		title: _('The Master'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('features.location.world');
		},
		scenes: {
			'start': {
				text: [
					_('an old wanderer arrives.'),
					_('he smiles warmly and asks for lodgings for the night.')
				],
				notification: _('an old wanderer arrives'),
				blink: true,
				buttons: {
					'agree': {
						text: _('agree'),
						cost: {
							'cured meat': 100,
							'Roche shells': 100,
							'torch': 1
						},
						nextScene: {1: 'agree'}
					},
					'deny': {
						text: _('turn him away'),
						nextScene: 'end'
					}
				}
			},
			'agree': {
				text: [
					_('in exchange, the wanderer offers his wisdom.')
				],
				buttons: {
					'evasion': {
						text: _('evasion'),
						available: function() {
							return !$SM.hasPerk('evasive');
						},
						onChoose: function() {
							$SM.addPerk('evasive');
						},
						nextScene: 'end'
					},
					'precision': {
						text: _('precision'),
						available: function() {
							return !$SM.hasPerk('precise');
						},
						onChoose: function() {
							$SM.addPerk('precise');
						},
						nextScene: 'end'
					},
					'force': {
						text: _('force'),
						available: function() {
							return !$SM.hasPerk('barbarian');
						},
						onChoose: function() {
							$SM.addPerk('barbarian');
						},
						nextScene: 'end'
					},
					'nothing': {
						text: _('nothing'),
						nextScene: 'end'
					}
				}
			}
		}
	},

	{ /* The Sick Man */
		title: _('The Sick Man'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.medicine', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					_("a man hobbles up, coughing."),
					_("he begs for medicine.")
				],
				notification: _('a sick man hobbles up'),
				blink: true,
				buttons: {
					'help': {
						text: _('give 1 medicine'),
						cost: { 'medicine': 1 },
						notification: _('the man swallows the medicine eagerly'),
						nextScene: { 0.1: 'alloy', 0.3: 'cells', 0.5: 'scales', 1.0: 'nothing' }
					},
					'ignore': {
						text: _('tell him to leave'),
						nextScene: 'end'
					}
				}
			},
			'alloy': {
				text: [
					_("the man is thankful."),
					_('he leaves a reward.'),
					_('some weird metal he picked up on his travels.')
				],
				onLoad: function() {
					$SM.add('stores["alien alloy"]', 1);
				},
				buttons: {
					'bye': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			'cells': {
				text: [
					_("the man is thankful."),
					_('he leaves a reward.'),
					_('some weird glowing boxes he picked up on his travels.')
				],
				onLoad: function() {
					$SM.add('stores["energy cell"]', 3);
				},
				buttons: {
					'bye': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			'scales': {
				text: [
					_("the man is thankful."),
					_('he leaves a reward.'),
					_('all he has are some scales.')
				],
				onLoad: function() {
					$SM.add('stores.scales', 5);
				},
				buttons: {
					'bye': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			'nothing': {
				text: [
					_("the man expresses his thanks and hobbles off.")
				],
				buttons: {
					'bye': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			}
		}
	}
];
