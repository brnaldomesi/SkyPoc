const savedViewOptions = 'savedViewOptions';
const savedFilterOptions = 'savedFilterOptions';

class ListViewStorage {
  static init(key) {
    switch (key) {
      case savedViewOptions:
        localStorage
          .setItem(savedViewOptions, JSON.stringify([]
          ));
        break;
        
      case savedFilterOptions:
        localStorage
          .setItem(savedFilterOptions, JSON.stringify([]
          ));
        break;
          
      default:
    }
  }

  static update(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static get(key) {
    const data = localStorage.getItem(key);
    if (!data) {
      ListViewStorage.init(key);
      return JSON.parse(localStorage.getItem(key));
    }
    return JSON.parse(data);
  }

  static updateSavedViewOptions(data) {
    ListViewStorage.update(savedViewOptions, data);
  }

  static getSavedViewOptions() {
    return ListViewStorage.get(savedViewOptions);
  }

  static updateSavedFilterOptions(data) {
    ListViewStorage.update(savedFilterOptions, data);
  }

  static getSavedFilterOptions() {
    return ListViewStorage.get(savedFilterOptions);
  }
}

export default ListViewStorage;
