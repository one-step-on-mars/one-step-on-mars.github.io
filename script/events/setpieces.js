/**
 * Events that only occur at specific times. Launched manually.
 **/
Events.Setpieces = {
	"outpost": { /* Friendly Outpost */
		title: _('An Outpost'),
		scenes: {
			'start': {
				text: [
					_('a safe place in this dusty land.')
				],
				notification: _('a safe place.'),
				loot: {
					'ration packs': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				onLoad: function() {
					World.useOutpost();
				},
				buttons: {
					'leave': {
						text: _('leave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			}
		}
	},
	"strange cave": { /* strange cave */
		title: _('A strange cave'),
		scenes: {
			'start': {
				text: [
					_('carved stones rise out of the cave flaw.'),
					_('a small grey figer fades into view sitting on one of the stones , silently.')
				],
				notification: _('carvings in the cave glow faintly in the thin martian air.'),
				buttons: {
					'enter': {
						text: _('enter'),
						nextScene: {1: 'cabin'}
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			'cabin': {
				text: [
					_('deep in the strange cave is a stone cabin.'),
					_('an old grey man sits inside, in a seeming trance.')
				],
				buttons: {
					'talk': {
						cost: {'charm': 1},
						text: _('talk'),
						nextScene: {1: 'talk'}
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			'talk': {
				text: [
					_('he takes the charm and nods slowly.'),
					_('he speaks of great fleets being sent off to new worlds.'),
					_('a great war between his people leaving only an apocalyptic wasteland.'),
					_('his days now are spent watching over his home world hopeing for his pepole to someday return.')
				],
				onLoad: function() {
					$SM.addPerk('gastronome');
					World.markVisited(World.curPos[0], World.curPos[1]);
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
	"cave": { /* Cave */
		title: _('a dark cave'),
		scenes: {
			'start': {
				text: [
					_('the mouth of the cave is wide and dark.'),
					_("can't see what's inside.")
				],
				notification: _('the earth here is split, as if bearing an ancient wound'),
				buttons: {
					'enter': {
						text: _('go inside'),
						cost: { torch: 1 },
						nextScene: {0.3: 'a1', 0.6: 'a2', 1: 'a3'}
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			
			'a1': {
				combat: true,
				enemy: 'insect',
				chara: 'R',
				damage: 1,
				hit: 0.8,
				attackDelay: 1,
				health: 5,
				notification: _('a startled insect defends its home'),
				loot: {
					'shells': {
						min: 1,
						max: 10,
						chance: 1
					},
					'spines': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'b1', 1: 'b2'}
					},
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'a2': {
				text: [
					_('the cave narrows a few feet in.'),
					_("the walls are moist and moss-covered")
				],
				buttons: {
					'continue': {
						text: _('squeeze'),
						nextScene: {0.5: 'b2', 1: 'b3'}
					},
					'leave': {
						text: _('leave cave'),
						nextScene: 'end'
					}
				}
			},
			'a3': {
				text: [
					_('the remains of an old camp sits just inside the cave.'),
					_('bedrolls, torn and blackened, lay beneath a thin layer of dust.')
				],
				loot: {
					'ration packs': {
						min: 1,
						max: 5,
						chance: 1
					},
					'torch': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'bioplastic': {
						min: 1,
						max: 5,
						chance: 0.3
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'b3', 1: 'b4'}
					},
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b1': {
				text: [
					_('the body of a wanderer lies in a small cavern.'),
					_("rot's been to work on it, and some of the pieces are missing."),
                    /// TRANSLATORS : 'it' is a rotting wanderer's body
					_("can't tell what left it here.")
				],
				loot: {
					'scrap sword': {
						min: 1,
						max: 1,
						chance: 1
					},
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'torch': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'medicine': {
					min: 1,
					max: 2,
					chance: 0.1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'c1' }
					},
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b2': {
				text: [
					_('the torch sputters and dies in the damp air'),
					_('the darkness is absolute')
				],
				notification: _('the torch goes out'),
				buttons: {
					'continue': {
						text: _('continue'),
						cost: {'torch': 1},
						nextScene: { 1: 'c1' }
					},
					'leave': {
						text: _('leave cave'),
						nextScene: 'end'
					}
				}
			},
			'b3': {
				combat: true,
				enemy: 'insect',
				chara: 'R',
				damage: 1,
				hit: 0.8,
				attackDelay: 1,
				health: 5,
				notification: _('a startled insect defends its home'),
				loot: {
					'shells': {
						min: 1,
						max: 3,
						chance: 1
					},
					'spines': {
						min: 1,
						max: 2,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'c2'}
					},
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b4': {
				combat: true,
				enemy: 'cave lizard',
				chara: 'R',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 6,
				notification: _('a cave lizard attacks'),
				loot: {
					'scales': {
						min: 1,
						max: 3,
						chance: 1
					},
					'spines': {
						min: 1,
						max: 2,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'c2'}
					},
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'c1': {
				combat: true,
				enemy: 'insect',
				chara: 'R',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				notification: _('a large insect charges out of the dark'),
				loot: {
					'shells': {
						min: 1,
						max: 3,
						chance: 1
					},
					'spines': {
						min: 1,
						max: 3,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end1', 1: 'end2'}
					},
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'c2': {
				combat: true,
				enemy: 'lizard',
				chara: 'T',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				notification: _('a giant lizard shambles forward'),
				loot: {
					'scales': {
						min: 1,
						max: 3,
						chance: 1
					},
					'spines': {
						min: 1,
						max: 3,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.7: 'end2', 1: 'end3'}
					},
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end1': {
				text: [
					_('the nest of a large animal lies at the back of the cave.')
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'meat': {
						min: 5,
						max: 10,
						chance: 1
					},
					'shells': {
						min: 5,
						max: 10,
						chance: 1
					},
					'scales': {
						min: 5,
						max: 10,
						chance: 1
					},
					'spines': {
						min: 5,
						max: 10,
						chance: 1
					},
					'batterys': {
						min: 5,
						max: 10,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end2': {
				text: [
					_('a small supply cache is hidden at the back of the cave.')
				],
				loot: {
					'batterys': {
						min: 5,
						max: 10,
						chance: 1
					},
					'bioplastic': {
						min: 5,
						max: 10,
						chance: 1
					},
					'scrap metal': {
						min: 5,
						max: 10,
						chance: 1
					},
					'ration packs': {
						min: 5,
						max: 10,
						chance: 1
					},
					'alloy': {
						min: 5,
						max: 10,
						chance: 0.5
					},
					'bolas': {
						min: 1,
						max: 3,
						chance: 0.3
					},
					'medicine': {
						min: 1,
						max: 4,
						chance: 0.15
					}
				},
				onLoad: function() {
					World.clearDungeon();
				},
				buttons: {
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end3': {
				text: [
					_('an old case is wedged behind a rock, covered in a thick layer of dust.')
				],
				loot: {
					'alloy sword': {
						min: 1,
						max: 1,
						chance: 1
					},
					'bolas': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'medicine': {
						min: 1,
						max: 3,
						chance: 0.3
					}
				},
				onLoad: function() {
					World.clearDungeon();
				},
				buttons: {
					'leave': {
						text: _('leave cave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			}
		}
	},
	"town": { /* Town */
		title: _('A Deserted Town'),
		scenes: {
			'start': {
				text: [
					_('a small suburb lays ahead, empty shelters scorched and peeling.'),
					_("broken streetlights stand, rusting. light hasn't graced this place in a long time.")
				],
				notification: _("the town lies abandoned, its citizens long dead"),
				buttons: {
					'enter': {
						text: _('explore'),
						nextScene: {0.3: 'a1', 0.7: 'a3', 1: 'a2'}
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			
			'a1': {
				text: [
					_("where the windows of the schoolshelter aren't shattered, they're blackened with soot."),
					_('the double doors creak endlessly in the wind.')
				],
				buttons: {
					'enter': {
						text: _('enter'),
						nextScene: {0.5: 'b1', 1: 'b2'},
						cost: {torch: 1}
					},
					'leave': {
						text: _('leave town'),
						nextScene: 'end'
					}
				}
			},
			
			'a2': {
				combat: true,
				enemy: 'thug',
				chara: 'E',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'batterys': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'bioplastic': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				notification: _('ambushed on the street.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'b3', 1: 'b4'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'a3': {
				text: [
					_("a squat building up ahead."),
					_('a green cross barely visible behind grimy windows.')
				],
				buttons: {
					'enter': {
						text: _('enter'),
						nextScene: {0.5: 'b5', 1: 'end5'},
						cost: {torch: 1}
					},
					'leave': {
						text: _('leave town'),
						nextScene: 'end'
					}
				}
			},
			'b1': {
				text: [
					_('a small cache of supplies is tucked inside a rusting locker.')
				],
				loot: {
					'ration packs': {
						min: 1,
						max: 5,
						chance: 1
					},
					'torch': {
						min: 1,
						max: 3,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.3
					},
					'medicine': {
						min: 1,
						max: 3,
						chance: 0.05
					}
			},
			buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'c1', 1: 'c2'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b2': {
				combat: true,
				enemy: 'scavenger',
				chara: 'E',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'batterys': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'bioplastic': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				notification: _('a scavenger waits just inside the door.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'c2', 1: 'c3'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b3': {
				combat: true,
				enemy: 'insect',
				chara: 'R',
				damage: 3,
				hit: 0.8,
				attackDelay: 1,
				health: 25,
				loot: {
					'spines': {
						min: 1,
						max: 5,
						chance: 1
					},
					'shells': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				notification: _('a insect stands alone in an overgrown park.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'c4', 1: 'c5'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b4': {
				text: [
					_('an overturned caravan is spread across the pockmarked street.'),
					_("it's been picked over by scavengers, but there's still some things worth taking.")
				],
				loot: {
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'torch': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.3
					},
					'medicine': {
						min: 1,
						max: 3,
						chance: 0.1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'c5', 1: 'c6' }
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b5': {
				combat: true,
				enemy: 'madman',
				chara: 'E',
				damage: 6,
				hit: 0.3,
				attackDelay: 1,
				health: 10,
				loot: {
					'batterys': {
						min: 2,
						max: 4,
						chance: 0.3
					},
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.9
					},
					'medicine': {
						min: 1,
						max: 2,
						chance: 0.4
					}
				},
				notification: _('a madman attacks, screeching.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.3: 'end5', 1: 'end6'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'c1': {
				combat: true,
				enemy: 'thug',
				chara: 'E',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'batterys': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'bioplastic': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				notification: _('a thug moves out of the shadows.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'd1'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'c2': {
				combat: true,
				enemy: 'insect',
				chara: 'R',
				damage: 3,
				hit: 0.8,
				attackDelay: 1,
				health: 25,
				loot: {
					'spines': {
						min: 1,
						max: 5,
						chance: 1
					},
					'shells': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				notification: _('a insect charges out of a ransacked classroom.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'd1'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'c3': {
				text: [
					_('through the large gymnasium doors, footsteps can be heard.'),
					_('the torchlight casts a flickering glow down the hallway.'),
					_('the footsteps stop.')
				],
				buttons: {
					'continue': {
						text: _('enter'),
						nextScene: {1: 'd1'}
					},
					'leave': {
						text: _('leave town'),
						nextScene: 'end'
					}
				}
			},
			'c4': {
				combat: true,
				enemy: 'insect',
				chara: 'R',
				damage: 4,
				hit: 0.8,
				attackDelay: 1,
				health: 25,
				loot: {
					'spines': {
						min: 1,
						max: 5,
						chance: 1
					},
					'shells': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				notification: _('another insect, draw by the noise, leaps out of a copse of trees.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'c5': {
				text: [
					_("something's causing a commotion a ways down the road."),
					_("a fight, maybe.")
				],
				buttons: {
					'continue': {
						text: _('continue'),
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: _('leave town'),
						nextScene: 'end'
					}
				}
			},
			'c6': {
				text: [
					_('a small basket of food is hidden under a park bench, with a note attached.'),
					_("can't read the words.")
				],
				loot: {
					'ration packs': {
						min: 1,
						max: 5,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'd1': {
				combat: true,
				enemy: 'scavenger',
				chara: 'E',
				damage: 5,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'ration packs': {
						min: 1,
						max: 5,
						chance: 1
					},
					'bioplastic': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'alloy sword': {
						min: 1,
						max: 1,
						chance: 0.5
					}
				},
				notification: _('a panicked scavenger bursts through the door, screaming.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end1', 1: 'end2'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'd2': {
				combat: true,
				enemy: 'vigilante',
				chara: 'D',
				damage: 6,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'ration packs': {
						min: 1,
						max: 5,
						chance: 1
					},
					'bioplastic': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'alloy sword': {
						min: 1,
						max: 1,
						chance: 0.5
					}
				},
				notification: _("a man stands over a dead wanderer. notices he's not alone."),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end3', 1: 'end4'}
					},
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end1': {
				text: [
					_('scavenger had a small camp in the school.'),
					_('collected scraps spread across the floor like they fell from heaven.')
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'alloy sword': {
						min: 1,
						max: 1,
						chance: 1
					},
					'alloy': {
						min: 5,
						max: 10,
						chance: 1
					},
					'ration packs': {
						min: 5,
						max: 10,
						chance: 1
					},
					'bolas': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'medicine': {
						min: 1,
						max: 2,
						chance: 0.3
					}
				},
				buttons: {
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end2': {
				text: [
					_("scavenger'd been looking for supplies in here, it seems."),
					_("a shame to let what he'd found go to waste.")
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'martion elements': {
						min: 5,
						max: 10,
						chance: 1
					},
					'ration packs': {
						min: 5,
						max: 10,
						chance: 1
					},
					'bioplastic': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end3': {
				text: [
					_("beneath the wanderer's rags, clutched in one of its many hands, a glint of alloy."),
					_("worth killing for, it seems.")
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'rifle': {
						min: 1,
						max: 1,
						chance: 1
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end4': {
				text: [
					_("eye for an eye seems fair."),
					_("always worked before, at least."),
					_("picking the bones finds some useful trinkets.")
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'ration packs': {
						min: 5,
						max: 10,
						chance: 1
					},
					'scrap metal': {
						min: 5,
						max: 10,
						chance: 1
					},
					'torch': {
						min: 1,
						max: 5,
						chance: 1
					},
					'bolas': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'medicine': {
					min: 1,
					max: 2,
					chance: 0.1
					}
				},
				buttons: {
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end5': {
				text: [
					_('some medicine abandoned in the drawers.')
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'medicine': {
						min: 2,
						max: 5,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: _('leave town'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'end6': {
				text: [
					_('the clinic has been ransacked.'),
					_('only dust and stains remain.')
				],
				onLoad: function() {
					World.clearDungeon();
				},
				buttons: {
					'leave': {
						text: _('leave town'),

						nextScene: 'end'
					}
				}
			}
		}
	},
	"city": { /* City */
		title: _('A Ruined Undergound City'),
		scenes: {
			'start': {
				text: [
					_('a statu stands guard at the entrance to this once-great undergound city.'),
					_("the towers that haven't crumbled jut from the landscape like the ribcage of some ancient monster."),
					_('might be things worth having still inside.')
				],
				notification: _("the towers of a decaying city dominate the caven"),
				buttons: {
					'enter': {
						text: _('explore'),
						nextScene: {0.2: 'a1', 0.5: 'a2', 0.8: 'a3', 1: 'a4'}
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			'a1': {
				text:[
					_('the streets are empty.'),
					_('depictions of vast long dead monsters can bee seen carved in the rock some nearly 100m high and bugs as large as tanks.')
				],
				buttons: {
					'continue': {
						text: _('continue'),
						nextScene: {0.5: 'b1', 1: 'b2'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			'a2': {
				text:[
					_('strange eggs lay fossilised amongst the rubble.'),
					_('lights flash through the alleys between buildings. this place may not be as abandoned as you thought.')
				],
				buttons: {
					'continue': {
						text: _('continue'),
						nextScene: {0.5: 'b3', 1: 'b4'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			'a3': {
				text: [
					_('glowing bugs hang from the towers.'),
					_('they seem to take no intrest in you.')
				],
				buttons: {
					'continue': {
						text: _('continue'),
						nextScene: {0.5: 'b5', 1: 'b6'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			'a4': {
				text: [
					_('the remains of an abandoned hospital looms ahead.')
				],
				buttons: {
					'enter': {
						text: _('enter'),
						cost: { 'torch': 1 },
						nextScene: {0.5: 'b7', 1: 'b8'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			'b1': {
				text: [
					_('the old tower seems mostly intact.'),
					_('the shells of a burned out car blocks the entrance.'),
					_('most of the windows at ground level are busted anyway.')
				],
				buttons: {
					'enter': {
						text: _('enter'),
						nextScene: {0.5: 'c1', 1: 'c2'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			'b2': {
				combat: true,
				notification: _('a huge lizard scrambles up out of the darkness of an old metro station.'),
				enemy: 'lizard',
				chara: 'R',
				damage: 5,
				hit: 0.8,
				attackDelay: 2,
				health: 20,
				loot: {
					'scales': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'spines': {
						min: 5,
						max: 10,
						chance: 0.5
					},
					'meat': {
						min: 5,
						max: 10,
						chance: 0.8
					}
				},
				buttons: {
					'descend': {
						text: _('descend'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'c2', 1: 'c3'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b3': {
				notification: _('the shot echoes in the empty street.'),
				combat: true,
				enemy: 'sniper',
				chara: 'D',
				damage: 15,
				hit: 0.8,
				attackDelay: 4,
				health: 30,
				ranged: true,
				loot: {
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'c4', 1: 'c5'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b4': {
				notification: _('the swam steps out from between the buildings, rifle raised.'),
				combat: true,
				enemy: 'swam',
				ranged: true,
				chara: 'D',
				damage: 8,
				hit: 0.8,
				attackDelay: 2,
				health: 50,
				loot: {
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'c5', 1: 'c6'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b5': {
				notification: _('a group of fire bug lava sit defiantly, blocking the path.'),
				combat: true,
				enemy: 'bug lava',
				chara: 'E',
				damage: 1,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				loot: {
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'batterys': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'bioplastic': {
						min: 1,
						max: 1,
						chance: 0.2
					},
					'medicine': {
						min: 1,
						max: 3,
						chance: 0.05
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'c7', 1: 'c8'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'b6': {
				text: [
					_('to think this once great place reduced to ruin.'),
					_('genetically engineered and mutated moss and fungi popping up in paches along the street.')
				],
				buttons: {
					'continue': {
						text: _('continue'),
						nextScene: {0.5: 'c8', 1: 'c9'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			'b7': {
				text: [
					_('empty corridors.'),
					_('the place has been swept clean by scavengers.')
				],
				buttons: {
					'continue': {
						text: _('continue'),
						nextScene: {0.3: 'c12', 0.7: 'c10', 1: 'c11'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			'b8': {
				notification: _('a crazed old man bursts through a door, wielding a scalpel.'),
				combat: true,
				enemy: 'old man',
				chara: 'E',
				damage: 3,
				hit: 0.5,
				attackDelay: 2,
				health: 10,
				loot: {
					'ration packs': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'batterys': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'medicine': {
						min: 1,
						max: 2,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.3: 'c13', 0.7: 'c11', 1: 'end15'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'c1': {
				notification: _('a raider thug is waiting on the other side of the wall.'),
				combat: true,
				enemy: 'thug',
				chara: 'E',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 30,
				loot: {
					'alloy sword': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'ration packs': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'batterys': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'd1', 1: 'd2'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'c2': {
				notification: _('a snarling insect jumps into view.'),
				combat: true,
				enemy: 'insect',
				chara: 'R',
				damage: 2,
				hit: 0.8,
				attackDelay: 1,
				health: 30,
				loot: {
					'meat': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'shells': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'spines': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'c3': {
				text: [
					_('rocks fall clearing a path.'),
					_('lets some light down into the dusty haze.'),
					_('a sound comes from the tunnel, just ahead.')
				],
				buttons: {
					'enter': {
						text: _('investigate'),
						cost: { 'torch': 1 },
						nextScene: {0.5: 'd2', 1: 'd3'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			
			'c4': {
				text: [
					_('looks like a camp of sorts up ahead.'),
                    /// TRANSLATORS : chainlink is a type of metal fence.
					_('rusted chainlink is pulled across an alleyway.'),
					_('empty ration packs litter the ground.')
				],
				buttons: {
					'enter': {
						text: _('continue'),
						nextScene: {0.5: 'd4', 1: 'd5'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			
			'c5': {
				text: [
					_('more voices can be heard ahead.'),
					_('they must be here for a reason.')
				],
				buttons: {
					'enter': {
						text: _('continue'),
						nextScene: {1: 'd5'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			
			'c6': {
				text: [
					_('the sound of gunfire carries on the wind.'),
					_('the street ahead iluminated by the flash.')
				],
				buttons: {
					'enter': {
						text: _('continue'),
						nextScene: {0.5: 'd5', 1: 'd6'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			
			'c7': {
				text: [
                    /// TRANSLATORS : BigBugs occupy abandoned dwellings they don't own.
					_('more BigBugs are crowding around now.'),
					_('one hisses at you.')
				],
				buttons: {
					'enter': {
						text: _('continue'),
						nextScene: {0.5: 'd7', 1: 'd8'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			
			'c8': {
				text: [
					_('a cart is set up on the sidewalk.'),
					_('the owner says hes found some good supplys from the rubble more than he can carry so he offers some to you.')
				],
				loot: {
					'alloy sword': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'bullets': {
						min: 1,
						max: 8,
						chance: 0.25
					},
					'supermaterials': {
						min: 1,
						max: 1,
						chance: 0.01
					},
					'medicine': {
						min: 1,
						max: 4,
						chance: 0.5
					}
				},
				buttons: {
					'enter': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'd8'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'c9': {
				text: [
					_('dead insects hang drying by the side of the street.'),
					_('a scavangers looks away keeping there distance.')
				],
				loot: {
					'ration packs': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'enter': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'd8', 1: 'd9'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'c10': {
				text: [
					_('someone has locked and barricaded some large gates blocking the path.')
				],
				buttons: {
					'enter': {
						text: _('continue'),
						nextScene: {0.2: 'end12', 0.6: 'd10', 1: 'd11'}
					},
					'leave': {
						text: _('leave city'),
						nextScene: 'end'
					}
				}
			},
			
			'c11': {
				notification: _('a group of gient but elderly Bugs is camped out in this ward.'),
				combat: true,
				enemy: 'BigBugs',
				plural: true,
				chara: 'EEE',
				damage: 2,
				hit: 0.7,
				attackDelay: 0.5,
				health: 40,
				loot: {
					'ration packs': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'batterys': {
						min: 3,
						max: 8,
						chance: 0.8
					},
					'medicine': {
						min: 1,
						max: 3,
						chance: 0.3
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'end10' }
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'c12': {
				notification: _('a pack of centipedes rounds the corner.'),
				combat: true,
				enemy: 'centipedes',
				plural: true,
				chara: 'RRR',
				damage: 4,
				hit: 0.7,
				attackDelay: 0.7,
				health: 30,
				loot: {
					'meat': {
						min: 3,
						max: 8,
						chance: 1
					},
					'spines': {
						min: 2,
						max: 4,
						chance: 1
					},
					'scales': {
						min: 3,
						max: 5,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'end10' }
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'c13': {
				text: [
					_('bugs are hunging this this ward suspended by silk.')
				],
				loot: {
					'ration packs': {
						min: 3,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 0.5: 'end10', 1: 'end11' }
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
						
			'd1': {
				notification: _('a giant mosquito nests at the top of the stairs.'),
				combat: true,
				enemy: 'mosquito',
				chara: 'R',
				damage: 5,
				hit: 0.7,
				attackDelay: 1,
				health: 45,
				loot: {
					'meat': {
						min: 5,
						max: 10,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end1', 1: 'end2'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd2': {
				text: [
					_("the debris is denser here."),
					_("maybe some useful stuff in the rubble.")
				],
				loot: {
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'alloy': {
						min: 1,
						max: 10,
						chance: 0.8
					},
					'supermaterials': {
						min: 1,
						max: 1,
						chance: 0.01
					},
					'batterys': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'end2'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd3': {
				notification: _('a swarm of cockroaches rushes up the tunnel.'),
				combat: true,
				enemy: 'cockroaches',
				plural: true,
				chara: 'RRR',
				damage: 1,
				hit: 0.8,
				attackDelay: 0.25,
				health: 60,
				loot: {
					'shells': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'spines': {
						min: 5,
						max: 10,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end2', 1: 'end3'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd4': {
				notification: _('a queen ant attacks, swarmed by warriers.'),
				combat: true,
				enemy: 'queen ant',
				chara: 'D',
				damage: 6,
				hit: 0.8,
				attackDelay: 2,
				health: 45,
				loot: {
					'bayonet': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end4', 1: 'end5'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd5': {
				notification: _('a swam decends.'),
				combat: true,
				enemy: 'swam',
				ranged: true,
				chara: 'D',
				damage: 8,
				hit: 0.8,
				attackDelay: 2,
				health: 50,
				loot: {
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'end5'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd6': {
				notification: _('a giant stag beetle rounds the corner, pincers drawing'),
				combat: true,
				enemy: 'commando',
				chara: 'D',
				ranged: true,
				damage: 3,
				hit: 0.9,
				attackDelay: 2,
				health: 55,
				loot: {
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end5', 1: 'end6'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd7': {
				notification: _('they surge forward.'),
				combat: true,
				enemy: 'BigBugs',
				plural: true,
				chara: 'EEE',
				damage: 2,
				hit: 0.7,
				attackDelay: 0.5,
				health: 40,
				loot: {
					'batterys': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'spines': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end7', 1: 'end8'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd8': {
				notification: _('a giant termite lashes out with sharp pincers.'),
				combat: true,
				enemy: 'giant termite',
				chara: 'E',
				damage: 2,
				hit: 0.7,
				attackDelay: 1,
				health: 45,
				loot: {
					'batterys': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'spines': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'end8'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd9': {
				notification: _('a BigBug stands firmly in the doorway of a small bunker.'),
				combat: true,
				enemy: 'BigBug',
				chara: 'E',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 20,
				loot: {
					'batterys': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'spines': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {0.5: 'end8', 1: 'end9'}
					},
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'd10': {
				notification: _('behind the door, a mutated figure awakes and attacks crased by radiation.'),
				combat: true,
				enemy: 'deformed',
				chara: 'T',
				damage: 8,
				hit: 0.6,
				attackDelay: 2,
				health: 40,
				loot: {
					'batterys': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'spines': {
						min: 2,
						max: 2,
						chance: 1
					},
					'alloy': {
						min: 1,
						max: 3,
						chance: 0.6
					},
					'scales': {
						min: 2,
						max: 3,
						chance: 0.1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'end14'}
					}
				}
			},
			
			'd11': {
				notification: _('as soon as the door is open a little bit, hundreds of tentacles erupt.'),
				combat: true,
				enemy: 'tentacles',
				plural: true,
				chara: 'TTT',
				damage: 2,
				hit: 0.6,
				attackDelay: 0.5,
				health: 60,
				loot: {
					'meat': {
						min: 10,
						max: 20,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: {1: 'end13'}
					}
				}
			},
		
			'end1': {
				text: [
					_('mosquito must have liked shiney things.'),
					_('some good stuff woven into its nest.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					bullets: {
						min: 5,
						max: 10,
						chance: 0.8
					},
					bolas: {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'supermaterials': {
						min: 1,
						max: 1,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end2': {
				text: [
					_('not much here.'),
					_('scavengers must have gotten to this place already.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					torch: {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end3': {
				text: [
                    /// TRANSLATORS : a platform in the subway
					_('the tunnel opens up at another platform.'),
					_('the walls are scorched from an old battle.'),
					_('bodies and supplies from both sides litter the ground.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					rifle: {
						min: 1,
						max: 1,
						chance: 0.8
					},
					bullets: {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'positronic ray': {
						min: 1,
						max: 1,
						chance: 0.3
					},
					'antimatter cell': {
						min: 1,
						max: 5,
						chance: 0.3
					},
					'supermaterials': {
						min: 1,
						max: 1,
						chance: 0.3
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end4': {
				text: [
					_('it is well supplied.'),
					_('arms and munitions, are neatly arranged on the store-room floor.'),
					_('just as effective now as ever.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					rifle: {
						min: 1,
						max: 1,
						chance: 1
					},
					bullets: {
						min: 1,
						max: 10,
						chance: 1
					},
					grenade: {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end5': {
				text: [
					_('searching yields a few supplies.'),
					_('more swams will be on their way.'),
					_('time to move on.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					rifle: {
						min: 1,
						max: 1,
						chance: 1
					},
					bullets: {
						min: 1,
						max: 10,
						chance: 1
					},
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'medicine': {
					min: 1,
					max: 4,
					chance: 0.1
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end6': {
				text: [
					_('the small settlement has clearly been hear a while.'),
					_('building half burryed in dust.'),
					_("still time to rescue a few supplies.")
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'positronic ray': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'antimatter cell': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'ration packs': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end7': {
				text: [
					_('it looks like there might be some supplys.'),
					_("there's not much, but some useful things can still be found.")
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'alloy sword': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'antimatter cell': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'ration packs': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end8': {
				text: [
					_('you spot a canvas sack.'),
					_("it contains travelling gear, and a few trinkets."),
					_("there's nothing else here.")
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'alloy sword': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'bolas': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'ration packs': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end9': {
				text: [
					_('inside the bunker theres an optomistic poster of a new green world.'),
					_("seem in stark contrast to this cramped bunker with just a few abandoned belongings left resting up against the walls."),
					_("there's nothing else here.")
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'bolas': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'supermaterials': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end10': {
				text: [
					_('the stench of rot and death fills the operating theatres.'),
					_("a few items are scattered on the ground."),
					_('there is nothing else here.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'antimatter cell': {
						min: 1,
						max: 1,
						chance: 0.3
					},
					'medicine': {
						min: 1,
						max: 5,
						chance: 0.3
					},
					'spines': {
						min: 3,
						max: 8,
						chance: 1
					},
					'scales': {
						min: 4,
						max: 7,
						chance: 0.9
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end11': {
				text: [
					_('a pristine medicine cabinet at the end of a hallway.'),
					_("the rest of the hospital is empty.")
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'antimatter cell': {
						min: 1,
						max: 1,
						chance: 0.2
					},
					'medicine': {
						min: 3,
						max: 10,
						chance: 1
					},
					'spines': {
						min: 1,
						max: 2,
						chance: 0.2
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end12': {
				text: [
					_('someone had been stockpiling loot here.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'antimatter cell': {
						min: 1,
						max: 3,
						chance: 0.2
					},
					'medicine': {
						min: 3,
						max: 10,
						chance: 0.5
					},
					'bullets': {
						min: 2,
						max: 8,
						chance: 1
					},
					'torch': {
					min: 1,
					max: 3,
					chance: 0.5
					},
					'grenade': {
					min: 1,
					max: 1,
					chance: 0.5
					},
					'supermaterials': {
					min: 1,
					max: 2,
					chance: 0.8
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end13': {
				text: [
					_('the tentacular horror is defeated.'),
					_('inside, the remains of its victims are everywhere.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'alloy sword': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'rifle': {
						min: 1,
						max: 2,
						chance: 0.3
					},
					'spines': {
						min: 2,
						max: 8,
						chance: 1
					},
					'batterys': {
					min: 3,
					max: 6,
					chance: 0.5
					},
					'supermaterials': {
					min: 1,
					max: 1,
					chance: 0.1
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end14': {
				text: [
                    /// TRANSLATORS : warped means extremely disfigured.
					_('the warped man lies dead.'),
					_('the operating theatre has a lot of curious equipment.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'antimatter cell': {
						min: 2,
						max: 5,
						chance: 0.8
					},
					'medicine': {
						min: 3,
						max: 12,
						chance: 1
					},
					'batterys': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'alloy': {
						min: 2,
						max: 3,
						chance: 0.3
					},
					'supermaterials': {
						min: 1,
						max: 1,
						chance: 0.3
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			
			'end15': {
				text: [
					_('you find a small cache of interesting items.')
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'supermaterials': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'medicine': {
					min: 1,
					max: 4,
					chance: 1
					},
					'ration packs': {
					min: 3,
					max: 7,
					chance: 1
					},
					'bolas': {
					min: 1,
					max: 3,
					chance: 0.5
					},
					'shells': {
					min: 1,
					max: 5,
					chance: 0.8
					}
				},
				buttons: {
					'leave': {
						text: _('leave city'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			}
		}
	},
	"shelter": { /* Abandoned Shelter */
		title: _('An Old Shelter'),
		scenes: {
			'start': {
				text: [
					_('An Old Shelter remains here, once black to keep warm now grayed rusty and peeling paint.'),
					_('the door hangs open.')
				],
				notification: _('the remains of An Old Shelter stand as a monument to early setalers'),
				buttons: {
					'enter': {
						text: _('go inside'),
						nextScene: { 0.25: 'medicine', 0.5: 'supplies', 1: 'occupied' }
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			'supplies': {
				text: [
					_('the bunker is abandoned, but not yet picked over.'),
					_('its sealed and theres some breathable air and a pump long sine abandoned in the bunker.')
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
					World.setO2(World.getMaxO2());
					Notifications.notify(null, _('O2 replenished'));
				},
				loot: {
					'ration packs': {
						min: 1,
						max: 10,
						chance: 0.8
					},
					'bioplastic': {
						min: 1,
						max: 10,
						chance: 0.2
					},
					'batterys': {
						min: 1,
						max: 10,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: _('leave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'medicine': {
				text: [
					_('the bunker has been ransacked.'),
					_('but theres still some medicine stashed in a small contaner.')
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				loot: {
					'medicine': {
						min: 2,
						max: 5,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: _('leave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'occupied': {
				combat: true,
				enemy: 'BigBug',
				chara: 'E',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				notification: _('a praying mantic like creature charges at you'),
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				loot: {
					'ration packs': {
						min: 1,
						max: 10,
						chance: 0.8
					},
					'bioplastic': {
						min: 1,
						max: 10,
						chance: 0.2
					},
					'batterys': {
						min: 1,
						max: 10,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: _('leave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			}
		}
	},
	"battlefield": { /* Discovering an old battlefield */
		title: _('A Forgotten Battlefield'),
		scenes: {
			'start': {
				text: [
					_('a battle was fought here, long ago aginst the Bugs.'),
					_('battered technology from the human side lays dormant on the blasted landscape.')
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				loot: {
					'rifle': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'bullets': {
						min: 5,
						max: 20,
						chance: 0.8
					},
					'positronic ray': {
						min: 1,
						max: 3,
						chance: 0.3
					},
					'antimatter cell': {
						min: 5,
						max: 10,
						chance: 0.5
					},
					'grenade': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'supermaterials': {
						min: 1,
						max: 1,
						chance: 0.3
					}
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
	"InsectDen": { /* Admiring a huge InsectDen */
		title: _('A Huge InsectDen'),
		scenes: {
			'start': {
				text: [
					_('a huge hole is cut deep into the earth though it looks like the resadence have moved on?'),
					_('it appears to be quite.'),
					_('the hole has uncovered some useful and rare matirials below the surface.')
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				loot: {
					'supermaterials': {
						min: 1,
						max: 3,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: _('leave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			}
		}
	},
	"ship": { /* Finding a way off this rock */
		title: _('A Crashed Ship'),
		scenes: {
			'start': {
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
					World.drawRoad();
					World.state.ship = true;
				},
				text: [
					_('the familiar curves of a high speak modern earth single stage vestal.'),
					_("lucky it seems in much better shape than our ship."),
					_('with a some minor repairs , it might fly again.')
				],
				buttons: {
					'leavel': {
						text: _('salvage'),
						nextScene: 'end'
					}
				}
			}
		}
	},
	"ExplosivesLab": { /* Clearing the Explosives Lab */
		title: _('The Explosives Lab'),
		scenes: {
			'start': {
				text: [
					_("the lab has been taken over by bugs."),
					_('swams patrol the perimeter.')
				],
				notification: _('the entrance is blocked looks like this will be a fight.'),
				buttons: {
					'attack': {
						text: _('attack'),
						nextScene: {1: 'a1'}
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			'a1': {
				combat: true,
				enemy: 'swam',
				ranged: true,
				chara: 'D',
				damage: 8,
				hit: 0.8,
				attackDelay: 2,
				health: 50,
				loot: {
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				notification: _('alerted bugs attack.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'a2' }
					},
					'run': {
						text: _('run'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'a2': {
				combat: true,
				enemy: 'swam',
				ranged: true,
				chara: 'D',
				damage: 8,
				hit: 0.8,
				attackDelay: 2,
				health: 50,
				loot: {
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'bullets': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'rifle': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				notification: _('more bugs join the fight.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'a3' }
					},
					'run': {
						text: _('run'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'a3': {
				combat: true,
				enemy: 'queen ant',
				chara: 'D',
				damage: 10,
				hit: 0.8,
				attackDelay: 2,
				health: 65,
				loot: {
					'bayonet': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				notification: _('a relentless swam attacks.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'cleared' }
					}
				}
			},
			'cleared': {
				text: [
					_('the bugs have been cleared.'),
					_('the lab is now safe for the crew.')
				],
				notification: _('the Explosives Lab is clear of dangers'),
				onLoad: function() {
					World.drawRoad();
					World.state.ExplosivesLab = true;
					World.markVisited(World.curPos[0], World.curPos[1]);
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
	"centrifuge": { /* Clearing the centrifuge */
		title: _('The centrifuge'),
		scenes: {
			'start': {
				text: [
					_('lights fliker in the lab.'),
					_('an android stands guard, weapon at the ready.')
				],
				notification: _('this lab is not abandoned'),
				buttons: {
					'attack': {
						text: _('attack'),
						nextScene: {1: 'a1'}
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			'a1': {
				combat: true,
				enemy: 'man',
				chara: 'E',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				loot: {
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'batterys': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				notification: _('an angry scientist joins the fight'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'a2' }
					},
					'run': {
						text: _('run'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'a2': {
				combat: true,
				enemy: 'man',
				chara: 'E',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				loot: {
					'ration packs': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'batterys': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				notification: _('an angry scientist joins the fight'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'a3' }
					},
					'run': {
						text: _('run'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: 'end'
					}
				}
			},
			'a3': {
				combat: true,
				enemy: 'chief',
				chara: 'D',
				damage: 5,
				hit: 0.8,
				attackDelay: 2,
				health: 20,
				loot: {
					'ration packs': {
						min: 5,
						max: 10,
						chance: 1
					},
					'batterys': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'scrap metal': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				notification: _('the toughest android remains.'),
				buttons: {
					'continue': {
						text: _('continue'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'cleared' }
					}
				}
			},
			'cleared': {
				text: [
					_('the lab is still, save and centrafuge working.'),
					_('the lab is now safe for your crew.')
				],
				notification: _('the centrifuge lab is clear of dangers'),
				onLoad: function() {
					World.drawRoad();
					World.state.centrifuge = true;
					World.markVisited(World.curPos[0], World.curPos[1]);
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
	"scrapmetal_mine": { /* Clearing the metal detectors */
		title: _('The metal detectors'),
		scenes: {
			'start': {
				text: [
					_('parts of some old metal detectors sit here, abandoned and left to rust. looks like they where looking for something.'),
					_('empty suits are strewn about the entrance. many, torn to shreds with jagged grooves.'),
					_('ominose screeches can be heard in the distrance.')
				],
				notification: _('the path leads to a small cave with some more parts for the metal detectors'),
				buttons: {
					'enter': {
						text: _('go inside'),
						nextScene: { 1: 'enter' },
						cost: { 'torch': 1 }
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			'enter': {
				combat: true,
				enemy: 'insectly matriarch',
				chara: 'T',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				loot: {
					'spines': {
						min: 5,
						max: 10,
						chance: 1
					},
					'scales': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'batterys': {
						min: 5,
						max: 10,
						chance: 0.5
					}
				},
				notification: _('a large sandworm lunges, muscles rippling in the torchlight'),
				buttons: {
					'leave': {
						text: _('leave'),
						cooldown: Events._LEAVE_COOLDOWN,
						nextScene: { 1: 'cleared' }
					}
				}
			},
			'cleared': {
				text: [
					_('the creaturee is dead.'),
					_('the area is now safe for your crew to scower for scrap metal.')
				],
				notification: _('you can now repair and use the metal detectors to look for scrap metal.'),
				onLoad: function() {
					World.drawRoad();
					World.state.scrapmetal_mine = true;
					World.markVisited(World.curPos[0], World.curPos[1]);
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
	
	"cache": { /* Cache - contains some of supplies from previous game */
		title: _('A Destroyed settlement'),
		scenes: {
			'start': {
				text: [
					_('a destroyed settlement lies in the dust.'),
					_('bodies litter the ground.')
				],
                /// TRANSLATORS : tang = strong metallic smell, wanderer afterburner = ship's engines
				notification: _('the metallic tang of wanderer afterburner hangs in the air.'),
				buttons: {
					'enter': {
						text: _('enter'),
						nextScene: {1: 'underground'}
					},
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			},
			'underground': {
				text: [
					_('a bio dome stands at the center of the settlement.'),
					_('there are still supplies inside.')
				],
				buttons: {
					'take': {
						text: _('take'),
						nextScene: {1: 'exit'}
					}
				}
			},
			'exit': {
				text: [
					_('all the work of a previous generation is here.'),
				_('ripe for the picking.')
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
					Prestige.collectStores();
				},
				buttons: {
					'leave': {
						text: _('leave'),
						nextScene: 'end'
					}
				}
			}
		}
	}
};
