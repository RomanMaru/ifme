import React, {useState} from 'react';
import axios from 'axios';
import { StoryContainer } from './StoryContainer';
import { LoadMoreButton } from '../LoadMoreButton';

export type Props = {
  container: string,
  data: any,
  fetchUrl: string,
  lastPage?: boolean,
};

export type State = {
  lastPage: boolean,
  page: number,
  data: any,
};

const BaseContainer = ({
  container,
  data: propData,
  fetchUrl,
  lastPage: propLastPage
}: Props) => {
  const [page, setPage] = useState(1);
  const [fetchedData, setFetchedData] = useState(propData);
  const [isLastPage, setIsLastPage] = useState(!!propLastPage)

  const onClick = () => {
    let url = new URL(`${window.location.origin + fetchUrl}`);
    url = `${url.origin}${url.pathname}.json?page=${page + 1}${
      url.search ? `&${url.search.substring(1)}` : ''}`;
    axios.get(url).then((response: any) => {
      if (response.data)  {
        setIsLastPage(response.data.lastPage);
        setPage(page + 1);
        setFetchedData(data.concat(response.data.data));
      }
    });
  };

  return (
    <>
      <StoryContainer data={fetchedData}/>
      {!isLastPage && <LoadMoreButton onClick={onClick} />}
    </>
  );
};

export default ({container, data, fetchUrl, lastPage}: Props) =>  (
  <BaseContainer container={container} data={data} fetchUrl={fetchUrl} lastPage={lastPage} />
);