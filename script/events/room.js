/**
 * Events that can occur when the Room module is active
 **/
Events.Room = [
	{ /* The Stranger  --  Merchant */
		title: _('stranger'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.shells', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					_('a stranger makes his way into view presumably from another landing sight? carying bags and offering to trade'),
					_("he also looks a little gray and won't say from where exactly this little guy came, but it's clear that he dosn't wish to stay.")
				],
				notification: _('a stranger arrives, looking to trade'),
				blink: true,
				buttons: {
					'buyScales': {
						text: _('buy scales'),
						cost: { 'shells': 100 },
						reward: { 'scales': 1 }
					},
					'buyspines': {
						text: _('buy spines'),
						cost: { 'shells': 200 },
						reward: { 'spines': 1 }
					},
					'buyBait': {
						text: _('buy bait'),
						cost: { 'shells': 5 },
						reward: { 'bait': 1 },
						notification: _('traps are more effective with bait.')
					},
					'buySolarRover': {
						available: function() {
							return $SM.get('stores.SolarRover', true) < 1;
						},
						text: _('buy SolarRover'),
						cost: { shells: 300, scales: 15, spines: 5 },
						reward: { 'SolarRover': 1 },
						notification: _('the old solarrover is dented and dusty, but it seems to work.')
					},
					'goodbye': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			}
		}
	},
	{ /* Noises Outside  --  gain energy/shells */
		title: _('Noises'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.energy');
		},
		scenes: {
			'start': {
				text: [
					_('outside the hab, scuttling noises can be heard.'),
					_("can't tell what they're up to.")
				],
				notification: _('strange noises can be heard outside the hab'),
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
				reward: { energy: 100, shells: 10 },
				text: [
					_('something dug up some radioisotope rocks just beyond the threshold, surounded by some shells.'),
					_('things are is silent.')
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
						nextScene: { 0.5: 'scales', 0.8: 'spines', 1: 'batterys' }
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
			spines: {
				text: [
					_('some energy is missing.'),
					_('the ground is littered with small spines')
				],
				onLoad: function() {
					var numenergy = $SM.get('stores.energy', true);
					numenergy = Math.floor(numenergy * 0.1);
					if(numenergy === 0) numenergy = 1;
					var numspines = Math.floor(numenergy / 5);
					if(numspines === 0) numspines = 1;
					$SM.addM('stores', {'energy': -numenergy, 'spines': numspines});
				},
				buttons: {
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			batterys: {
				text: [
					_('some energy is missing.'),
					_('some abandoned batterys litter the ground')
				],
				onLoad: function() {
					var numenergy = $SM.get('stores.energy', true);
					numenergy = Math.floor(numenergy * 0.1);
					if(numenergy === 0) numenergy = 1;
					var numbatterys = Math.floor(numenergy / 5);
					if(numbatterys === 0) numbatterys = 1;
					$SM.addM('stores', {'energy': -numenergy, 'batterys': numbatterys});
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
	{ /* The Beggar  --  trade shells for better good */
		title: _('The Scientist'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.shells');
		},
		scenes: {
			start: {
				text: [
					_('a scientist arrives.'),
					_('asks for any spare shells for his resurch.')
				],
				notification: _('a scientist arrives'),
				blink: true,
				buttons: {
					'50shells': {
						text: _('give 50'),
						cost: {shells: 50},
						nextScene: { 0.5: 'scales', 0.8: 'spines', 1: 'batterys' }
					},
					'100shells': {
						text: _('give 100'),
						cost: {shells: 100},
						nextScene: { 0.5: 'spines', 0.8: 'scales', 1: 'batterys' }
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
					_('the scientist expresses his thanks.'),
					_('leaves a pile of small scales behind.')
				],
				buttons: {
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			spines: {
				reward: { spines: 20 },
				text: [
					_('the scientist expresses his thanks.'),
					_('leaves a pile of small spines behind.')
				],
				buttons: {
					'leave': {
						text: _('say goodbye'),
						nextScene: 'end'
					}
				}
			},
			batterys: {
				reward: { batterys: 20 },
				text: [
					_('the scientist expresses his thanks.'),
					_('leaves some batterys behind.')
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
	{/* The Shady engineer */
		title: _('The Shady engineer'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('game.buildings["bunker"]', true) >= 5 && $SM.get('game.buildings["bunker"]', true) < 20;
		},
		scenes: {
			'start':{
				text: [
					_('a strange little man passes through. he looks unwell with grayish skin but says not to worry'),
					_('he offers to build you a bunker useing less energy')
				],
				notification: _('a strange little man passes through'),
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
					_("the strange man charges some odd looking eqipment from the ship then runs off")
				],
				notification: _('the stranger has made off with your power'),
				buttons: {
					'end': {
						text: _('go home'),
						nextScene: 'end'
					}
				}
			},
			'build': {
				text:[
					_("the strange man builds another bunker and you thank him for his effort")
				],
				notification: _('the strange man builds a bunker'),
				onLoad: function() {
					var n = $SM.get('game.buildings["bunker"]', true);
					if(n < 20){
						$SM.set('game.buildings["bunker"]',n+1);
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
					_('a wanderer arrives with an empty power cell. says if he leaves with energy, he\'ll be back with more.'),
					_("engineer's not sure he's to be trusted.")
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
					_('the wanderer leaves, after charging up')
				],
				action: function(inputDelay) {
					var delay = inputDelay || false;
					Events.saveDelay(function() {
						$SM.add('stores.energy', 300);
						Notifications.notify(Room, _('the mysterious wanderer returns, with radioactive isotops you use for energy.'));
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
					_('the wanderer leaves, after charging up')
				],
				action: function(inputDelay) {
					var delay = inputDelay || false;
					Events.saveDelay(function() {
						$SM.add('stores.energy', 1500);
						Notifications.notify(Room, _('the mysterious wanderer returns, with radioactive isotops you use for energy.'));
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

	{ /* Mysterious Wanderer  --  shells gambling */
		title: _('The Mysterious Wanderer'),
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores.shells');
		},
		scenes: {
			start: {
				text: [
					_('a wanderer arrives. says if she leaves with shells, she\'ll be back with more.'),
					_("engineer's not sure she's to be trusted.")
				],
				notification: _('a mysterious wanderer arrives'),
				blink: true,
				buttons: {
					'shells100': {
						text: _('give 100'),
						cost: {shells: 100},
						nextScene: { 1: 'shells100'}
					},
					'shells500': {
						text: _('give 500'),
						cost: {shells: 500},
						nextScene: { 1: 'shells500' }
					},
					'deny': {
						text: _('turn her away'),
						nextScene: 'end'
					}
				}
			},
			'shells100': {
				text: [
					_('the wanderer leaves, with bags loaded with shells')
				],
				action: function(inputDelay) {
					var delay = inputDelay || false;
					Events.saveDelay(function() {
						$SM.add('stores.shells', 300);
						Notifications.notify(Room, _('the mysterious wanderer returns, focus solar piled high with shells.'));
					}, 'Room[5].scenes.shells100.action', delay);
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
			'shells500': {
				text: [
					_('the wanderer leaves, with bags loaded with shells')
				],
				action: function(inputDelay) {
					var delay = inputDelay || false;
					Events.saveDelay(function() {
						$SM.add('stores.shells', 1500);
						Notifications.notify(Room, _('the mysterious wanderer returns, focus solar piled high with shells.'));
					}, 'Room[5].scenes.shells500.action', delay);
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
					_("and is willing to talk about it, for a price.")
				],
				notification: _('a scout stops for the night'),
				blink: true,
				buttons: {
					'buyMap': {
						text: _('buy map'),
						cost: { 'shells': 200, 'scales': 10 },
						available: function() {
							return !World.seenAll;
						},
						notification: _('the map uncovers a bit of the world'),
						onChoose: World.applyMap
					},
					'learn': {
						text: _('learn scouting'),
						cost: { 'shells': 1000, 'scales': 50, 'spines': 20 },
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
							'ration packs': 100,
							'shells': 100,
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
					$SM.add('stores["supermaterials"]', 1);
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
					$SM.add('stores["antimatter cell"]', 3);
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
