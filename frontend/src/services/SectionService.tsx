import axios from 'axios';

class BannerService {
  getAllSection = (page: number, size: number) => {
    return axios.get(`/api/sections/${page}/${size}`);
  };
  getSectionHasMaxId = () => {
    return axios.get(`/api/sections/max-id`);
  };
  getByCode = (code: string) => {
    return axios.get(`/api/sections/by-code=${code}`);
  };

  getAllSectionByPageId = (pageId: number) => {
    return axios.get(`/api/sections/pageId=${pageId}/list-section`);
  };
  getAllSectionHasBannerIdByPageId = (bannerId: number, pageId: number) => {
    return axios.get(`/api/sections/list-section/pageId=${pageId}/bannerId=${bannerId}`);
  };
  save = (item: any, setErrOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    return axios.post(`/api/sections`, item).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        setErrOpen(true);
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

  delete = (sectionId: number) => {
    return axios.delete(`/api/sections/${sectionId}`);
  };

  deleteSMBySectionId = (sectionId: number) => {
    return axios.delete(`/api/section-mapping/delete-by-sectionId/${sectionId}`);
  };

  getSectionByPageId = (pageId: number) => {
    return axios.get(`/api/sections/page-id=${pageId}`);
  };

  saveSectionMapping = (item: any) => {
    return axios.post(`/api/section-mapping`, item);
  };

  getSectionAvailable = (pageId: number) => {
    return axios.get(`/api/sections/` + 'available/page-id=' + pageId);
  };
  getListSectionInPageByPageId = (pageId: any) => {
    return axios.get(`/api/sections/` + 'pageId=' + pageId + '/list-section');
  };
  updateSectionMapping = (item: any) => {
    return axios.put(`/api/section-mapping`, item);
  };

  deleteSectionMapping = (sectionId: number, pageId: any) => {
    return axios.delete(`/api/section-mapping/${pageId}/${sectionId}`);
  };
}
export default new BannerService();
