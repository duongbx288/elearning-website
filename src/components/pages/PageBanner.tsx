import React from 'react';
import { TableCell, TableRow } from '@mui/material';
export interface BannerMapping {
  id: number;
  position: string;
  positionValue: string;
  checked: boolean;
  createdBy?: string;
  timeHide: number;
  numberHide: number;
}
const PageBanner = ({ item, bannerArray, setBannerArray }: any) => {
  const [disable, setDisable] = React.useState<boolean>(false);
  const [timeHide, setTimeHide] = React.useState<number>(0);
  const [numberHide, setNumberHide] = React.useState<number>(0);
  const [position, setPosition] = React.useState<string>(
    typeof item.position === 'undefined' ? 'default' : item.position
  );
  const [pstValue, setPstValue] = React.useState<string>(
    typeof item.positionValue === 'undefined' ? '0' : item.positionValue
  );

  const handleChangePosition = (e: any) => {
    setPosition(e.target.value as string);
  };
  const handleChangePositionValue = (e: any) => {
    setPstValue(e.target.value as string);
  };
  const handleChangeTimeHide = (e: any) => {
    setTimeHide(e.target.value as unknown as number);
  };
  const handleChangeNumberHide = (e: any) => {
    setNumberHide(e.target.value as unknown as number);
  };
  const handleSaveArr = (e: any, item: any) => {
    if (e.target.checked === true) {
      setDisable(true);
    } else {
      setDisable(false);
    }

    let itemArr: BannerMapping = {
      id: item.id,
      position: position === 'default' ? '0' : position,
      positionValue: pstValue,
      checked: e.target.checked,
      timeHide: timeHide,
      numberHide: numberHide,
    };
    const avaiSection = bannerArray.find(
      (banner: BannerMapping) => banner.id === item.id
    );
    if (typeof avaiSection === 'undefined') {
      setBannerArray([...bannerArray, itemArr]);
    } else {
      updateBannerArray(itemArr);
    }
  };
  const updateBannerArray = (itemArr: BannerMapping) => {
    const tempArr = bannerArray.map((banner: BannerMapping) =>
      banner.id === itemArr.id ? { ...banner, check: itemArr.checked } : banner
    );
  };

  return (
    <TableRow className="item" key={item.id}>
      <TableCell className="text-center">{item.id}</TableCell>
      <TableCell className="text-center">{item.title}</TableCell>
      <TableCell className="text-center" sx={{ p: 1 }}>
        <img
          src={item.imgUrl}
          style={{ maxHeight: '100px', maxWidth: '200px' }}
          alt="ảnh banner"
        />
      </TableCell>
      <TableCell className="text-center checkbox">
        <select
          className="form-select text-center"
          value={position}
          disabled={disable}
          onChange={(e) => handleChangePosition(e)}
        >
          <option value="default">Mặc định</option>
          <option value="top-left">Top, left</option>
          <option value="top-right">Top, right</option>
          <option value="bottom-left">Bottom, left</option>
          <option value="bottom-right">Bottom, right</option>
        </select>
      </TableCell>
      <TableCell className="text-center checkbox">
        <input
          value={pstValue}
          disabled={disable}
          className="form-control text-center"
          type="text"
          style={{ width: '80%', marginLeft: '20px' }}
          onChange={handleChangePositionValue}
        />
      </TableCell>
      <TableCell className="text-center checkbox">
        <input
          value={numberHide || 0}
          className="form-control text-ctem.numberHienter"
          type="number"
          style={{ width: '80%', marginLeft: '10px' }}
          onChange={handleChangeNumberHide}
        />
      </TableCell>
      <TableCell className="text-center checkbox">
        <input
          value={timeHide || 0}
          className="form-control text-center"
          type="number"
          style={{ width: '80%', marginLeft: '10px' }}
          onChange={handleChangeTimeHide}
        />
      </TableCell>
      <TableCell className="text-center checkbox">
        <input
          type="checkbox"
          style={{ transform: 'scale(1.5)' }}
          id={String(item.id)}
          onClick={(e) => handleSaveArr(e, item)}
        />
      </TableCell>
    </TableRow>
  );
};

export default PageBanner;
