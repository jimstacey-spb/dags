import { useCallback, useEffect, useState } from "react";

function uuidv4():string {
  // @ts-ignore
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const fetchDogApi = async (method: string): Promise<[Response, object]> => {
    console.log('fetchDogApi');
    const response = await fetch('https://dog.ceo/api/' + method);
    const data = await response.json();
    // console.groupEnd();
    return [response, data];
}

const useDogFetch = async (method: string, successCallback: (response: Response, data: any) => void) => {
    // console.group('useDogFetch')
    useEffect(() => {
        const call = async () => {
            // console.group('useDogFetch call')
            if (method) {
                const [response, data] = await fetchDogApi(method);
                switch (response.status) {
                    case 200:
                        successCallback(response, data);
                        break;
                }
            }
            // console.groupEnd();
        }
        call();
    }, [method]);
    // console.groupEnd();
}

const useBreedList = (): [string[], CallableFunction] => {
  const uuid = uuidv4();
    console.group('useBreedList', uuid);
    const [breedList, setBreedList] = useState([]);
    const successCallback = useCallback((response: Response, data: any) => {
        console.log('useBreedList successCallback data', uuid, data);
        setBreedList(data.message);
    }, []);
    useDogFetch('breeds/list/all', successCallback);
    console.groupEnd();
    return [breedList, setBreedList];
}

const useRandomDog = (breed: string) => {
    console.group('useRandomDog');
    const [imageSrc, setImageSrc] = useState('');
    useDogFetch(breed && `breed/${breed}/images/random`,
        (response, data) => {
            console.log(data);
            setImageSrc(data.message);
        }
    );
    console.groupEnd();
    return imageSrc;
}

export {
    useDogFetch,
    useBreedList,
    useRandomDog
}