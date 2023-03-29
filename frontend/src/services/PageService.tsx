import axios from 'axios';
import React from 'react';

type PageInfo = {
  id: number;
  websiteId: number;
  pageName: string;
  pageUrl: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
  createdBy?: string;
  lastModifiedBy?: string;
};

class PageService {
  getPageInfoById = (pageId: number) => {
    return axios.get(`/api/pages/${pageId}`);
  };
  getPageByWebCodeAndPageName = (webCode: string, pageName: string) => {
    return axios.get(`/api/pages/pageName/${webCode}/${pageName}`);
  };

  getPageInfoByPageUrl = (pageUrl: string) => {
    return axios.get(`/api/pages/pageUrl/${pageUrl}`);
  };
  getListPageByBannerId = (bannerId: number) => {
    return axios.get(`/api/pages/list-page-for-popup/banner=${bannerId}`);
  };
  getPageViaSectionAndBannerId = (bannerId: number) => {
    return axios.get(`/api/pages/list-page-via-section/banner=${bannerId}`);
  };

  getAllPage = () => {
    return axios.get(`/api/pages/all`);
  };

  getAllPagePagination = (pageNumber: number) => {
    return axios.get(`/api/pages//pagination/${pageNumber}` + pageNumber);
  };

  getPageByWebsiteId = (websiteId: number) => {
    return axios.get(`/api/pages/websiteId/${websiteId}`);
  };

  getPageByWebsiteCode = (code: string) => {
    return axios.get(`/api/pages/web-code=${code}`);
  };

  countPageByWebsiteId = (websiteId: number) => {
    return axios.get(`/api/pages/count/${websiteId}` + websiteId);
  };

  savePage = (
    pageInfo: PageInfo,
    setErrOpen3: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    return axios.post(`/api/pages/add`, pageInfo).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        if (error.response.data.pageName === 'duplicated+code') {
          setErrOpen3(true);
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });
  };

  // For CreatePage.tsx
  savePage1 = (
    pageInfo: PageInfo,
    setErrOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setErrOpen2: React.Dispatch<React.SetStateAction<boolean>>,
    setErrOpen3: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    return axios.post(`/api/pages/add-new`, pageInfo).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        if (error.response.data === 'Duplicate Page Url') {
          setErrOpen2(true);
        } else setErrOpen(true);
      } else if (error.request) {
        console.log('Request is made but no response received: ' + error.request);
        setErrOpen3(true);
        console.log(error.request);
      } else {
        console.log('Error while setting up request', error.message);
        setErrOpen(true);
      }
    });
  };

  updatePage = (pageInfo: PageInfo) => {
    return axios.put(`/api/pages/update`, pageInfo).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });
  };

  // For UpdatePage.tsx
  updatePage1 = (
    pageInfo: PageInfo,
    setErrOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setErrOpen2: React.Dispatch<React.SetStateAction<boolean>>,
    setErrOpen3: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    return axios.put(`/api/pages/update-old`, pageInfo).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        if (error.response.data === 'Duplicate Page Url') {
          setErrOpen2(true);
        } else setErrOpen(true);
      } else if (error.request) {
        console.log('Request is made but no response received: ' + error.request);
        setErrOpen3(true);
        console.log(error.request);
      } else {
        console.log('Error while setting up request', error.message);
        setErrOpen(true);
      }
    });
  };

  deletePage = (pageId: number) => {
    return axios.delete(`/api/pages/delete/${pageId}`).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });
  };
}

export default new PageService();
