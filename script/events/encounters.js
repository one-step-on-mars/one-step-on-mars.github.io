/**
 * Events that can occur when wandering around the world
 **/
Events.Encounters = [
	/* Tier 1 */
	{ /* Snarling insect */
		title: _('A Snarling insect'),
		isAvailable: function() {
			return World.getDistance() <= 10 && World.getTerrain() == World.TILE.FOREST;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'snarling insect',
				enemyName: _('snarling insect'),
				deathMessage: _('the snarling insect is dead'),
				chara: 'R',
				damage: 1,
				hit: 0.8,
				attackDelay: 1,
				health: 5,
				loot: {
					'shells': {
						min: 1,
						max: 3,
						chance: 1
					},
					'meat': {
						min: 1,
						max: 3,
						chance: 1
					},
					'spines': {
						min: 1,
						max: 3,
						chance: 0.8
					}
				},
				notification: _('a snarling insect leaps out of the underbrush')
			}
		}
	},
	{ /* Giant Cockroach */
	title: _('A Giant Cockroach'),
		isAvailable: function() {
			return World.getDistance() <= 10 && World.getTerrain() == World.TILE.BARRENS;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'giant cockroach',
				enemyName: _('giant cockroach'),
				deathMessage: _('the giant cockroach is dead'),
				chara: 'E',
				damage: 2,
				hit: 0.8,
				attackDelay: 2,
				health: 6,
				loot: {
					'batterys': {
						min: 1,
						max: 3,
						chance: 0.8
					},
					'spines': {
						min: 1,
						max: 2,
						chance: 0.8
					},
					'bioplastic': {
						min: 1,
						max: 2,
						chance: 0.5
					}
				},
				notification: _('a giant cockroach approaches, a crazed look in its eye')
			}
		}
	},
	{ /* Strange mosquito */
	title: _('A Strange mosquito'),
		isAvailable: function() {
			return World.getDistance() <= 10 && World.getTerrain() == World.TILE.FIELD;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'strange mosquito',
				enemyName: _('strange mosquito'),
				deathMessage: _('the strange mosquito is dead'),
				chara: 'R',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 4,
				loot: {
					'scales': {
						min: 1,
						max: 3,
						chance: 0.8
					},
					'spines': {
						min: 1,
						max: 2,
						chance: 0.5
					},
					'meat': {
						min: 1,
						max: 3,
						chance: 0.8
					}
				},
				notification: _('a strange looking mosquito speeds across the plains')
			}
		}
	},
	/* Tier 2*/
	{ /* Shivering Man */
	title: _('A Shivering Man'),
		isAvailable: function() {
			return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.BARRENS;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'shivering man',
				enemyName: _('shivering man'),
				deathMessage: _('the shivering man is dead'),
				chara: 'E',
				damage: 5,
				hit: 0.5,
				attackDelay: 1,
				health: 20,
				loot: {
					'batterys': {
						min: 1,
						max: 1,
						chance: 0.2
					},
					'spines': {
						min: 1,
						max: 2,
						chance: 0.8
					},
					'bioplastic': {
						min: 1,
						max: 1,
						chance: 0.2
					},
					'medicine': {
						min: 1,
						max: 3,
						chance: 0.7
					}
				},
				notification: _('a shivering man approaches and attacks with surprising strength')
			}
		}
	},
	{ /* Man-eater */
		title: _('A Man-Eater'),
		isAvailable: function() {
			return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.FOREST;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'man-eater',
				enemyName: _('man-eater'),
				deathMessage: _('the man-eater is dead'),
				chara: 'T',
				damage: 3,
				hit: 0.8,
				attackDelay: 1,
				health: 25,
				loot: {
					'shells': {
						min: 5,
						max: 10,
						chance: 1
					},
					'meat': {
						min: 5,
						max: 10,
						chance: 1
					},
					'spines': {
						min: 5,
						max: 10,
						chance: 0.8
					}
				},
				notification: _('a large creature attacks, claws freshly bloodied')
			}
		}
	},
	{ /* Scavenger */
	title: _('A Scavenger'),
		isAvailable: function() {
			return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.BARRENS;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'scavenger',
				enemyName: _('scavenger'),
				deathMessage: _('the scavenger is dead'),
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
					'scrap metal': {
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
				notification: _('a scavenger draws close, hoping for an easy score')
			}
		}
	},
	{ /* Huge Lizard */
	title: _('A Huge Lizard'),
		isAvailable: function() {
			return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.FIELD;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'lizard',
				enemyName: _('lizard'),
				deathMessage: _('the lizard is dead'),
				chara: 'T',
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
				notification: _('the grass thrashes wildly as a huge lizard pushes through')
			}
		}
	},
	/* Tier 3*/
	{ /* Feral Terror */
		title: _('A Feral Terror'),
		isAvailable: function() {
			return World.getDistance() > 20 && World.getTerrain() == World.TILE.FOREST;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'feral terror',
				enemyName: _('feral terror'),
				deathMessage: _('the feral terror is dead'),
				chara: 'T',
				damage: 6,
				hit: 0.8,
				attackDelay: 1,
				health: 45,
				loot: {
					'shells': {
						min: 5,
						max: 10,
						chance: 1
					},
					'meat': {
						min: 5,
						max: 10,
						chance: 1
					},
					'spines': {
						min: 5,
						max: 10,
						chance: 0.8
					}
				},
				notification: _('a insect, wilder than imagining, erupts out of the foliage')
			}
		}
	},
	{ /* Soldier */
	title: _('A Soldier'),
		isAvailable: function() {
			return World.getDistance() > 20 && World.getTerrain() == World.TILE.BARRENS;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'swam',
				enemyName: _('swam'),
				deathMessage: _('the swam is dead'),
				ranged: true,
				chara: 'D',
				damage: 8,
				hit: 0.8,
				attackDelay: 2,
				health: 50,
				loot: {
					'batterys': {
						min: 5,
						max: 10,
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
					},
					'medicine': {
						min: 1,
						max: 2,
						chance: 0.1
					}
				},
				notification: _('a swam opens fire from across the desert')
			}
		}
	},
	{ /* Sniper */
	title: _('A Sniper'),
		isAvailable: function() {
			return World.getDistance() > 20 && World.getTerrain() == World.TILE.FIELD;
		},
		scenes: {
			'start': {
				combat: true,
				enemy: 'sniper',
				enemyName: _('sniper'),
				deathMessage: _('the sniper is dead'),
				chara: 'D',
				damage: 15,
				hit: 0.8,
				attackDelay: 4,
				health: 30,
				ranged: true,
				loot: {
					'batterys': {
						min: 5,
						max: 10,
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
					},
					'medicine': {
						min: 1,
						max: 2,
						chance: 0.1
					}
				},
				notification: _('a shot rings out, from somewhere in the long grass')
			}
		}
	}
];
