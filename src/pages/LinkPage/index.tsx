import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import Avatar from 'components/Avatar';
import styled from 'styled-components';
import colors from 'styles/colors';
import axios from 'axios';
import { useMatch } from 'react-router';
import { Link } from 'react-router-dom';
import DetailPage from 'pages/DetailPage';
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

const LinkPage: FC = () => {
  const [data, setData] = useState<LinkData[]>([]);
  const detailMatch = useMatch('/:key');
  const [fetch, setFetch] = useState(true);

  useEffect(() => {
    const nowTime = new Date(Date.now()).getSeconds();
    setTimeout(() => {
      setFetch((prev) => !prev);
      setInterval(() => {
        setFetch((prev) => !prev);
      }, 15000);
    }, 60000 - nowTime * 1000);
  }, []);

  useEffect(() => {
    axios.get('/homeworks/links').then((res) => {
      setData(res.data);
    });
  }, []);

  function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const dateTimeFormatter = (time: number) => {
    const day = Number(
      ((time * 1000 - Date.now()) / (1000 * 60 * 60 * 24)).toFixed()
    );
    const hour = Number(
      ((time * 1000 - Date.now()) / (1000 * 60 * 60)).toFixed()
    );
    const min = Number(
      (((time * 1000 - Date.now()) / (1000 * 60)) % 60).toFixed()
    );

    if (hour > 0 && hour < 48) {
      return `${hour}시간 ${min < 10 ? '0' + min : min}분`;
    } else if (hour >= 48) {
      return `${day}일`;
    } else {
      return '만료됨';
    }
  };

  return (
    <>
      {!detailMatch ? (
        <>
          <Title>마이 링크</Title>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>제목</TableCell>
                <TableCell>파일개수</TableCell>
                <TableCell>크기</TableCell>
                <TableCell>유효기간</TableCell>
                <TableCell>받은사람</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((ele: LinkData, idx: number) => {
                  const hour = Number(
                    (
                      (ele.expires_at * 1000 - Date.now()) /
                      (1000 * 60 * 60)
                    ).toFixed()
                  );
                  return (
                    <TableRow key={idx}>
                      <TableCell>
                        <LinkInfo>
                          <LinkImage>
                            <img
                              referrerPolicy="no-referrer"
                              src={
                                ele.thumbnailUrl.slice(-3) !== 'svg'
                                  ? ele.thumbnailUrl
                                  : '/svgs/default.svg'
                              }
                              alt=""
                            />
                          </LinkImage>
                          <LinkTexts>
                            <Link to={`/${ele.key}`}>
                              <LinkTitle>{ele.summary}</LinkTitle>
                            </Link>
                            <LinkUrl
                              onClick={() =>
                                copyUrl(
                                  hour < 0 ? '만료됨' : `${BASE_URL}/${ele.key}`
                                )
                              }
                            >
                              {hour < 0 ? '만료됨' : `${BASE_URL}/${ele.key}`}
                            </LinkUrl>
                          </LinkTexts>
                        </LinkInfo>
                        <span />
                      </TableCell>
                      <TableCell>
                        <span>파일개수</span>
                        <span>{ele.count.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <span>파일사이즈</span>
                        <span>{formatBytes(ele.size)}</span>
                      </TableCell>
                      <TableCell>
                        <span>유효기간</span>
                        <span>{dateTimeFormatter(ele.expires_at)}</span>
                      </TableCell>
                      <TableCell>
                        <span>받은사람</span>
                        <LinkReceivers>
                          {ele.sent && ele.sent.emails[0] && (
                            <Avatar text={ele.sent.emails[0]} />
                          )}
                        </LinkReceivers>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </>
      ) : (
        <DetailPage key={Date.now() + '1'} data={data} />
      )}
    </>
  );
};

export default LinkPage;

const Title = styled.h2`
  color: ${colors.grey700};
  letter-spacing: -0.62px;
  word-break: keep-all;
  margin: 0;
`;

const Table = styled.table`
  margin-top: 24px;
  margin-bottom: 102px;
  width: 100%;
  display: table;
  position: relative;
  text-align: left;
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse;
  border-spacing: 0px;
  color: ${colors.grey600};
`;

const TableHead = styled.thead`
  font-weight: 600;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableBody = styled.tbody`
  font-weight: 400;
  cursor: pointer;

  tr {
    @media (max-width: 768px) {
      float: left;
      width: calc(100% - 40px);
      position: relative;
      box-shadow: 0 2px 17px 0 rgba(0, 0, 0, 0.07);
      margin-bottom: 30px;
      background-color: ${colors.white};
      border-radius: 4px;
      padding: 0px 20px 20px 20px;
    }
  }

  th {
    font-size: 14px;

    & > span:first-child {
      display: none;
    }

    @media (max-width: 768px) {
      width: 100%;
      border-bottom: none;
      padding: 20px 0;
      border-top: 1px solid;
      border-color: ${colors.grey200};
      display: flex;
      justify-content: space-between;

      & > span:first-child {
        display: inline-block;
      }
      & > *:last-child {
        display: inline-block;
      }
      &:first-child {
        border-top: none;
      }
    }
  }
`;

const TableRow = styled.tr`
  color: inherit;
  display: table-row;
  vertical-align: middle;
  outline: 0px;
  font-weight: inherit;
  font-size: inherit;
`;

const TableCell = styled.th`
  font-weight: inherit;
  font-size: inherit;
  font-size: 12px;
  line-height: 24px;
  display: table-cell;
  vertical-align: inherit;
  border-bottom: 1px solid ${colors.grey300};
  text-align: left;
  padding: 16px;
`;

const LinkInfo = styled.div`
  display: flex;
  align-items: center;
`;

const LinkImage = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 4px;
  }
`;

const LinkTexts = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 16px;

  & > * {
    margin: 0;
  }
`;

const LinkTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.grey700};
`;

const LinkUrl = styled.a`
  text-decoration: underline;

  :hover {
    color: ${colors.teal700};
  }
`;

const LinkReceivers = styled.div`
  display: flex;

  & > * + * {
    margin-left: 8px;
  }
`;
