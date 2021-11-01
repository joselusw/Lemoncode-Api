# 01 CRUD

In this example we are going to replace mock API with real api requests, using json-server as mock server.

We will start from `00-boilerplate`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- Run app:

```bash
npm start
```

- Update `getCharacterCollection` api method:

### Fetch version

_./src/pods/character-collection/api/character-collection.api.ts_

```diff
import { CharacterEntityApi } from './character-collection.api-model';
import { mockCharacterCollection } from './character-collection.mock-data';

let characterCollection = [...mockCharacterCollection];
+ const url = '/api/characters';

export const getCharacterCollection = async (): Promise<CharacterEntityApi[]> => {
- return characterCollection;
+ const response = await fetch(url);
+ if (response.ok) {
+   return await response.json();
+ } else {
+   throw Error(response.statusText);
+ }
};

...

```

### Axios version

_./src/pods/character-collection/api/character-collection.api.ts_

```diff
+ import Axios from 'axios';
import { CharacterEntityApi } from './character-collection.api-model';
import { mockCharacterCollection } from './character-collection.mock-data';

let characterCollection = [...mockCharacterCollection];
+ const url = '/api/characters';

export const getCharacterCollection = async (): Promise<CharacterEntityApi[]> => {
- return characterCollection;
+ const { data } = await Axios.get<CharacterEntityApi[]>(url);
+ return data;
};

...

```

- Update `deleteCharacter` api method:

> NOTE: There is an issue with delete method
> Check [issue](https://github.com/typicode/json-server/issues/760)

### Fetch version

_./src/pods/character-collection/api/character-collection.api.ts_

```diff
import { CharacterEntityApi } from './character-collection.api-model';
- import { mockCharacterCollection } from './character-collection.mock-data';

- let characterCollection = [...mockCharacterCollection];
const url = '/api/characters';

...

+ // json-server delete issue: It deletes all collection instead of single one.
+ // https://github.com/typicode/json-server/issues/760
export const deleteCharacter = async (id: string): Promise<boolean> => {
- characterCollection = characterCollection.filter((h) => h.id !== id);
- return true;
+ const response = await fetch(`${url}/${id}`, { method: 'DELETE' });
+ return response.ok;
};

```

### Axios version

_./src/pods/character-collection/api/character-collection.api.ts_

```diff
import Axios from 'axios';
import { CharacterEntityApi } from './character-collection.api-model';
- import { mockCharacterCollection } from './character-collection.mock-data';

- let characterCollection = [...mockCharacterCollection];
const url = '/api/characters';

...

+ // json-server delete issue: It deletes all collection instead of single one.
+ // https://github.com/typicode/json-server/issues/760
export const deleteCharacter = async (id: string): Promise<boolean> => {
- characterCollection = characterCollection.filter((h) => h.id !== id);
+ await Axios.delete(`${url}/${id}`);
  return true;
};

```

- Delete `./src/pods/character-collection/api/character-collection.mock-data.ts`, not used.

- Update `getCharacter` api method:

### Fetch version

_./src/pods/character/api/character.api.ts_

```diff
import { Character } from './character.api-model';
import { Lookup } from 'common/models';
- import { mockCities, mockCharacterCollection } from './character.mock-data';
+ import { mockCities } from './character.mock-data';

+ const characterListUrl = '/api/characters';

export const getCharacter = async (id: string): Promise<Character> => {
- return mockCharacterCollection.find((h) => h.id === id);
+ const response = await fetch(`${characterListUrl}/${id}`);
+ if (response.ok) {
+   return await response.json();
+ } else {
+   throw Error(response.statusText);
+ }
};

...

```

### Axios version

_./src/pods/character/api/character.api.ts_

```diff
+ import Axios from 'axios';
import { Character } from './character.api-model';
import { Lookup } from 'common/models';
- import { mockCities, mockCharacterCollection } from './character.mock-data';
+ import { mockCities } from './character.mock-data';

+ const characterListUrl = '/api/characters';

export const getCharacter = async (id: string): Promise<Character> => {
- return mockCharacterCollection.find((h) => h.id === id);
+ const { data } = await Axios.get<Character>(`${characterListUrl}/${id}`);

+ return data;
};

...

```

- Update `getCities` api method:

### Fetch version

_./src/pods/character/api/character.api.ts_

```diff
import { Character } from './character.api-model';
import { Lookup } from 'common/models';
- import { mockCities } from './character.mock-data';

const characterListUrl = '/api/characters';
+ const cityListUrl = '/api/cities';

...

export const getCities = async (): Promise<Lookup[]> => {
- return mockCities;
+ const response = await fetch(cityListUrl);
+ if (response.ok) {
+   return await response.json();
+ } else {
+   throw Error(response.statusText);
+ }
};

...

```

### Axios version

_./src/pods/character/api/character.api.ts_

```diff
import Axios from 'axios';
import { Character } from './character.api-model';
import { Lookup } from 'common/models';
- import { mockCities } from './character.mock-data';

const characterListUrl = '/api/characters';
+ const cityListUrl = '/api/cities';

...

export const getCities = async (): Promise<Lookup[]> => {
- return mockCities;
+ const { data } = await Axios.get<Lookup[]>(cityListUrl);

+ return data;
};

...

```

- Update `saveCharacter` api method:

### Fetch version

_./src/pods/character/api/character.api.ts_

```diff
...

export const saveCharacter = async (character: Character): Promise<boolean> => {
+ if (character.id) {
+   await fetch(`${characterListUrl}/${character.id}`, {
+     method: 'PUT',
+     headers: {
+       'Content-Type': 'application/json',
+     },
+     body: JSON.stringify(character),
+   });
+ } else {
+   await fetch(characterListUrl, {
+     method: 'POST',
+     headers: {
+       'Content-Type': 'application/json',
+     },
+     body: JSON.stringify(character),
+   });
+ }
  return true;
};

```

### Axios version

_./src/pods/character/api/character.api.ts_

```diff
...

export const saveCharacter = async (character: Character): Promise<boolean> => {
+ if (character.id) {
+   await Axios.put<Character>(`${characterListUrl}/${character.id}`, character);
+ } else {
+   await Axios.post<Character>(characterListUrl, character);
+ }
  return true;
};

```

- Delete `./src/pods/character/api/character.mock-data.ts`, not used.

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
