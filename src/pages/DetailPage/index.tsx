import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';
import Button from 'components/Button';
import { useLocation } from 'react-router';
import { copyUrl } from 'utils/utils';
import { BASE_URL } from 'constants/constants';

interface LinkData {
  created_at: number;
  key: string | undefined;
  expires_at: number;
  download_count: number;
  count: number;
  size: number;
  summary: string;
  thumbnailUrl: string;
  files: {
    key: string;
    thumbnailUrl: string;
    name: string;
    size: number;
  }[];
  sent: {
    subject: string;
    content: string;
    emails: string[];
  };
}

interface DetailProps {
  data: LinkData[];
}

const DetailPage = ({ data }: DetailProps) => {
  const location = useLocation();
  const keyValue = location.pathname.slice(1);
  const detailData = data.filter((item) => item.key === keyValue);

  const filesData = () => {
    let result: number = 0;
    for (let i = 0; i < detailData[0].files.length; i++) {
      result += detailData[0].files[i].size;
    }
    return result;
  };

  function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  const onDownloadClick = () => {
    alert('다운로드 되었습니다.');
  };

  if (!detailData[0]) {
    return null;
  }

  const formatDate = (dateTime: any) => {
    const resultDateTime = new Date(dateTime * 1000);
    const date = String(new Date());
    let formatted_date =
      resultDateTime.getFullYear() +
      '년 ' +
      (resultDateTime.getMonth() + 1) +
      '월 ' +
      resultDateTime.getDate() +
      '일 ' +
      (resultDateTime.getHours() < 10
        ? '0' + resultDateTime.getHours()
        : resultDateTime.getHours()) +
      ':' +
      (resultDateTime.getMinutes() < 10
        ? '0' + resultDateTime.getMinutes()
        : resultDateTime.getMinutes()) +
      ' ' +
      date.slice(-14, -11) +
      ':' +
      date.slice(-11, -9);
    return formatted_date;
  };

  const hour = Number(
    (
      (detailData[0].expires_at * 1000 - Date.now()) /
      (1000 * 60 * 60)
    ).toFixed()
  );

  return (
    <>
      <Header>
        <LinkInfo>
          <Title>
            {detailData[0].sent?.subject
              ? detailData[0].sent?.subject
              : detailData[0].summary}
          </Title>
          <Url
            onClick={() =>
              copyUrl(hour < 0 ? '만료됨' : `${BASE_URL}/${detailData[0].key}`)
            }
          >
            {hour < 0 ? '만료됨' : `${BASE_URL}/${detailData[0].key}`}
          </Url>
        </LinkInfo>
        {hour > 0 && (
          <DownloadButton onClick={onDownloadClick}>
            <img referrerPolicy="no-referrer" src="/svgs/download.svg" alt="" />
            받기
          </DownloadButton>
        )}
      </Header>
      <Article>
        <Descrition>
          <Texts>
            <Top>링크 생성일</Top>
            <Bottom>
              {' '}
              {formatDate(new Date(detailData[0] && detailData[0].created_at))}
            </Bottom>
            <Top>메세지</Top>
            <Bottom>
              {detailData[0].sent?.content
                ? detailData[0].sent?.content
                : detailData[0].summary}
            </Bottom>
            <Top>다운로드 횟수</Top>
            <Bottom>{detailData[0].download_count}</Bottom>
          </Texts>
          <LinkImage>
            <Image
              thumbNail={
                detailData[0].thumbnailUrl.slice(-3) !== 'svg'
                  ? detailData[0].thumbnailUrl
                  : ''
              }
            />
          </LinkImage>
        </Descrition>
        {hour > 0 && (
          <ListSummary>
            <div>총 {detailData[0].files.length}개의 파일</div>
            <div>{formatBytes(filesData())}</div>
          </ListSummary>
        )}
        <FileList>
          {hour > 0 &&
            detailData[0].files.map((ele, idx) => (
              <FileListItem key={idx}>
                <FileItemInfo>
                  <span />

                  <span>{ele.name}</span>
                </FileItemInfo>
                <FileItemSize>{formatBytes(ele.size)}</FileItemSize>
              </FileListItem>
            ))}
        </FileList>
      </Article>
    </>
  );
};

const Header = styled.header`
  display: flex;
  color: ${colors.grey600};
  margin-bottom: 32px;
`;

const LinkInfo = styled.div`
  overflow: hidden;
  flex-grow: 1;
`;

const Title = styled.h3`
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 28px;
  color: ${colors.grey700};
  font-size: 20px;
`;

const Url = styled.a`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  text-decoration: underline;
  line-height: 20px;
  font-size: 14px;

  :hover {
    color: ${colors.teal700};
  }
`;

const DownloadButton = styled(Button)`
  font-size: 16px;

  img {
    margin-right: 8px;
  }
`;

const Article = styled.article`
  border-radius: 4px;
  border-color: ${colors.grey200};
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0 0 0 1px rgb(0 20 61 / 8%), 0 3px 3px 0 rgb(0 20 61 / 4%);
  background-color: ${colors.white};
  color: ${colors.grey600};
  font-size: 14px;
  font-weight: 400;
`;

const Descrition = styled.div`
  display: flex;
  padding: 36px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 24px;
  }
`;

const Texts = styled.div`
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Top = styled.label`
  font-weight: 600;
  line-height: 20px;
`;

const Bottom = styled.p`
  color: ${colors.grey700};
  margin: 8px 0 24px;
`;

const LinkImage = styled.div`
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background-color: ${colors.grey50};

  @media (max-width: 768px) {
    margin-bottom: 32px;
    max-width: 100%;
  }
`;

const Image = styled.span<{ thumbNail: string }>`
  width: 120px;
  display: inline-block;
  background-image: ${({ thumbNail }) =>
    thumbNail ? `url(${thumbNail})` : 'url(/svgs/default.svg)'};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  padding-bottom: 100%;
`;

const ListSummary = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 36px;
  font-weight: 600;
  border-top: 1px solid;
  border-color: ${colors.grey200};

  @media (max-width: 768px) {
    padding: 12px 24px;
  }
`;

const FileList = styled.ul`
  border-top: 1px solid;
  border-color: ${colors.grey200};
  padding: 0;
  margin: 0;
  padding: 0 36px;
  color: ${colors.grey700};

  @media (max-width: 768px) {
    padding: 0 24px;
  }

  & > li + li {
    border-top: 1px solid;
    border-color: ${colors.grey200};
  }
`;

const FileListItem = styled.li`
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FileItemInfo = styled.div`
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;
  display: flex;
  align-items: center;

  span:first-child {
    width: 40px;
    height: 40px;
    margin-right: 12px;
    display: inline-block;
    background-image: url(/svgs/default.svg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
`;

const FileItemSize = styled.div``;

export default DetailPage;
