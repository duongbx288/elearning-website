import * as React from 'react';
import { Box } from '@mui/material';
import background from '../../assets/background.png';

const DemoBanner = ({
  modal,
  position,
  pst1,
  pst2,
  pstVl1,
  pstVl2,
  widthImg,
  heightImg,
  preViewImage,
}: any) => {
  React.useEffect(() => {}, [
    modal,
    position,
    pst1,
    pst2,
    pstVl1,
    pstVl2,
    widthImg,
    heightImg,
    preViewImage,
  ]);
  return (
    <Box>
      <h5 className="text-center mt-3 text-primary">Xem trước</h5>
      {modal === 'Không' ? (
        <div
          id="showPopup"
          style={{
            marginTop: '20px',
            width: '100%',
            height: '300px',
            backgroundColor: 'whitesmoke',
            border: '1px solid black',
            position: 'relative',
            backgroundImage: 'url(' + background + ')',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            boxShadow: '0 0 0 1px rgb(63 63 68 / 5%), 0 1px 3px 0 rgb(63 63 68 / 15%)',
            borderRadius: '5px',
            padding: '24px',
            boxSizing: 'border-box',
          }}
        >
          {position === 'default' ? (
            <div
              style={{
                position: 'absolute',
                top: '50px',
                left: (500 - (widthImg / window.innerWidth) * 500) / 2 + 'px',
                width: (widthImg / window.innerWidth) * 500 + 'px',
                height: (heightImg / 1000) * 300 + 'px',
                border: '3px solid red',
              }}
            >
              <img
                src={preViewImage}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                alt=""
              />
            </div>
          ) : pst1 === 'top' ? (
            pst2 === 'left' ? (
              <div
                style={{
                  position: 'absolute',
                  top: (pstVl1 / window.innerHeight) * 300 + 'px',
                  left: (pstVl2 / window.innerWidth) * 500 + 'px',
                  width: (widthImg / window.innerWidth) * 500 + 'px',
                  height: (heightImg / 1000) * 300 + 'px',
                  border: '3px solid red',
                }}
              >
                <img
                  src={preViewImage}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  alt=""
                />
              </div>
            ) : (
              <div
                style={{
                  position: 'absolute',
                  top: (pstVl1 / window.innerHeight) * 300 + 'px',
                  right: (pstVl2 / window.innerWidth) * 500 + 'px',
                  width: (widthImg / window.innerWidth) * 500 + 'px',
                  height: (heightImg / 1000) * 300 + 'px',
                  border: '3px solid red',
                }}
              >
                <img
                  src={preViewImage}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  alt=""
                />
              </div>
            )
          ) : pst2 === 'left' ? (
            <div
              style={{
                position: 'absolute',
                bottom: (pstVl1 / window.innerHeight) * 300 + 'px',
                left: (pstVl2 / window.innerWidth) * 500 + 'px',
                width: (widthImg / window.innerWidth) * 500 + 'px',
                height: (heightImg / 1000) * 300 + 'px',
                border: '3px solid red',
              }}
            >
              <img
                src={preViewImage}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                alt=""
              />
            </div>
          ) : (
            <div
              style={{
                position: 'absolute',
                bottom: (pstVl1 / window.innerHeight) * 300 + 'px',
                right: (pstVl2 / window.innerWidth) * 500 + 'px',
                width: (widthImg / window.innerWidth) * 500 + 'px',
                height: (heightImg / 1000) * 300 + 'px',
                border: '3px solid red',
              }}
            >
              <img
                src={preViewImage || ''}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                alt=""
              />
            </div>
          )}
        </div>
      ) : (
        <div
          id="showPopup"
          style={{
            marginTop: '20px',
            width: '100%',
            height: '300px',
            backgroundImage: 'url(' + background + ')',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            border: '1px solid red',
            position: 'relative',
            boxShadow: '0 0 0 1px rgb(63 63 68 / 5%), 0 1px 3px 0 rgb(63 63 68 / 15%)',
            borderRadius: '5px',
            padding: '24px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '0px',
              left: '0px',
              backgroundColor: 'rgb(127,127,127,0.7)',
            }}
          >
            {position === 'default' ? (
              <div
                style={{
                  position: 'absolute',
                  top: '50px',
                  left: (500 - (widthImg / window.innerWidth) * 500) / 2 + 'px',
                  width: (widthImg / window.innerWidth) * 500 + 'px',
                  height: (heightImg / 1000) * 300 + 'px',
                  border: '3px solid red',
                }}
              >
                <img
                  src={preViewImage}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  alt=""
                />
              </div>
            ) : pst1 === 'top' ? (
              pst2 === 'left' ? (
                <div
                  style={{
                    position: 'absolute',
                    top: (pstVl1 / window.innerHeight) * 300 + 'px',
                    left: (pstVl2 / window.innerWidth) * 500 + 'px',
                    width: (widthImg / window.innerWidth) * 500 + 'px',
                    height: (heightImg / 1000) * 300 + 'px',
                    border: '3px solid red',
                  }}
                >
                  <img
                    src={preViewImage}
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                    alt=""
                  />
                </div>
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    top: (pstVl1 / window.innerHeight) * 300 + 'px',
                    right: (pstVl2 / window.innerWidth) * 500 + 'px',
                    width: (widthImg / window.innerWidth) * 500 + 'px',
                    height: (heightImg / 1000) * 300 + 'px',
                    border: '3px solid red',
                  }}
                >
                  <img
                    src={preViewImage}
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                    alt=""
                  />
                </div>
              )
            ) : pst2 === 'left' ? (
              <div
                style={{
                  position: 'absolute',
                  bottom: (pstVl1 / window.innerHeight) * 300 + 'px',
                  left: (pstVl2 / window.innerWidth) * 500 + 'px',
                  width: (widthImg / window.innerWidth) * 500 + 'px',
                  height: (heightImg / 1000) * 300 + 'px',
                  border: '3px solid red',
                }}
              >
                <img
                  src={preViewImage}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  alt=""
                />
              </div>
            ) : (
              <div
                style={{
                  position: 'absolute',
                  bottom: (pstVl1 / window.innerHeight) * 300 + 'px',
                  right: (pstVl2 / window.innerWidth) * 500 + 'px',
                  width: (widthImg / window.innerWidth) * 500 + 'px',
                  height: (heightImg / 1000) * 300 + 'px',
                  border: '3px solid red',
                }}
              >
                <img
                  src={preViewImage}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      )}
    </Box>
  );
};
export default DemoBanner;
