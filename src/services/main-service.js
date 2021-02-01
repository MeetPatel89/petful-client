import config from '../config';

export const fetchPeople = () => {
  return fetch(`${config.API_BASE_URL}/people`).then((res) => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  });
};

export const fetchDogList = () => {
  return fetch(`${config.API_BASE_URL}/dog-queue`).then((res) => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  });
};

export const fetchCatList = () => {
  return fetch(`${config.API_BASE_URL}/cat-queue`).then((res) => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  });
};

export const postDogPerson = (person) => {
  return fetch(`${config.API_BASE_URL}/dog-queue`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      person,
    }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  });
};

export const deleteDogPerson = () => {
  return fetch(`${config.API_BASE_URL}/dog-queue`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Something went wrong adopting this pet, please try again later`
      );
    }
  });
};

export const postCatPerson = (person) => {
  return fetch(`${config.API_BASE_URL}/cat-queue`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      person,
    }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  });
};

export const deleteCatPerson = () => {
  return fetch(`${config.API_BASE_URL}/cat-queue`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Something went wrong adopting this pet, please try again later`
      );
    }
  });
};

export const fetchPets = () => {
  return fetch(`${config.API_BASE_URL}/pets`).then((res) => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  });
};

export const fetchDogs = () => {
  return fetch(`${config.API_BASE_URL}/dogs`).then((res) => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  });
};

export const fetchCats = () => {
  return fetch(`${config.API_BASE_URL}/cats`).then((res) => {
    if (!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  });
};

export const serverAdoptCat = () => {
  return fetch(`${config.API_BASE_URL}/cats`, {
    method: 'DELETE',
    header: {
      'content-type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Something went wrong adopting this pet, please try again later`
      );
    }
  });
};

export const serverAdoptDog = () => {
  return fetch(`${config.API_BASE_URL}/dogs`, {
    method: 'DELETE',
    header: {
      'content-type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Something went wrong adopting this pet, please try again later`
      );
    }
  });
};
