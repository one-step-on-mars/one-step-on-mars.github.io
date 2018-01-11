const Prestige = {

  name: 'Prestige',

  options: {},

  init(options) {
    this.options = $.extend(this.options, options);
  },

  storesMap: [
    { store: 'energy', type: 'g' },
    { store: 'shells', type: 'g' },
    { store: 'meat', type: 'g' },
    { store: 'scrap metal', type: 'g' },
    { store: 'martion_elements', type: 'g' },
    { store: 'sulphur', type: 'g' },
    { store: 'alloy', type: 'g' },
    { store: 'ration packs', type: 'g' },
    { store: 'scales', type: 'g' },
    { store: 'spines', type: 'g' },
    { store: 'bioplastic', type: 'g' },
    { store: 'bait', type: 'g' },
    { store: 'torch', type: 'g' },
    { store: 'batterys', type: 'g' },
    { store: 'bone spear', type: 'w' },
    { store: 'scrap metal sword', type: 'w' },
    { store: 'alloy sword', type: 'w' },
    { store: 'bayonet', type: 'w' },
    { store: 'rifle', type: 'w' },
    { store: 'laser rifle', type: 'w' },
    { store: 'bullets', type: 'a' },
    { store: 'energy cell', type: 'a' },
    { store: 'grenade', type: 'a' },
    { store: 'bolas', type: 'a' },
  ],

  getStores(reduce) {
    const stores = [];

    for (const i in this.storesMap) {
      const s = this.storesMap[i];
      stores.push(Math.floor($SM.get(`stores["${s.store}"]`, true) /
					(reduce ? this.randGen(s.type) : 1)));
    }

    return stores;
  },

  get() {
    return {
      stores: $SM.get('previous.stores'),
      score: $SM.get('previous.score'),
    };
  },

  set(prestige) {
    $SM.set('previous.stores', prestige.stores);
    $SM.set('previous.score', prestige.score);
  },

  save() {
    $SM.set('previous.stores', this.getStores(true));
    $SM.set('previous.score', Score.totalScore());
  },

  collectStores() {
    const prevStores = $SM.get('previous.stores');
    if (prevStores != null) {
      const toAdd = {};
      for (const i in this.storesMap) {
        const s = this.storesMap[i];
        toAdd[s.store] = prevStores[i];
      }
      $SM.addM('stores', toAdd);

      // Loading the stores clears em from the save
      prevStores.length = 0;
    }
  },

  randGen(storeType) {
    let amount;
    switch (storeType) {
      case 'g':
        amount = Math.floor(Math.random() * 10);
        break;
      case 'w':
        amount = Math.floor(Math.floor(Math.random() * 10) / 2);
        break;
      case 'a':
        amount = Math.ceil(Math.random() * 10 * Math.ceil(Math.random() * 10));
        break;
      default:
        return 1;
    }
    if (amount !== 0) {
      return amount;
    }
    return 1;
  },

};
