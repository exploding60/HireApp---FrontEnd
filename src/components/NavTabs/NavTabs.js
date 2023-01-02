import React, { useState, useEffect } from "react";
import Assets from "../../assets/img";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useSelector } from "react-redux";
import axios from "axios";
import Portofolio from "../Portofolio/Portofolio";

function NavTabs() {
  const [data, setData] = useState(null);
  const [dataPortofolio, setDataPortofolio] = useState(null);
  const id = localStorage.getItem("Id");
  let user = `${process.env.REACT_APP_URL_ROUTE}/experiences/${id}`;
  let portofolio = `${process.env.REACT_APP_URL_ROUTE}/portofolio/${id}`;
  useEffect(() => {
    axios
      .get(user)
      .then((res) => {
        console.log("get data success");
        console.log(res.data);
        res.data && setData(res.data.data);
      })
      .catch((err) => {
        console.log("get data fail");
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(portofolio)
      .then((res) => {
        console.log("get data success");
        console.log(res.data);
        res.data && setDataPortofolio(res.data.data);
      })
      .catch((err) => {
        console.log("get data fail");
        console.log(err);
      });
  }, []);
  const [key, setKey] = useState("portofolio");
  return (
    <div className="container text-start shadow rounded-2 mt-1 bg-white">
      <div className="row bg-light rounded-3">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="portofolio" title="Portofolio">
            <div className="row mt-2">
              {dataPortofolio ? (
                dataPortofolio.map((item) => (
                  <div className="col-4">
                    <img src={item.image} alt="" style={{ width: "100px" }} />
                    <h6 className="myfont3 mt-2" style={{ marginLeft: "10px" }}>
                      {item.name}
                    </h6>
                  </div>
                ))
              ) : (
                <h1>...Loading</h1>
              )}
            </div>
          </Tab>
          <Tab eventKey="pengalamanKerja" title="Pengalaman kerja">
            <div className="row mt-4">
              {data ? (
                data.map((item) => (
                  <div>
                    <div className="col-1">
                      <img src={Assets.tokped} alt="" />
                    </div>
                    <div className="col-9 offset-1">
                      <h5 className="myfont">{item.role}</h5>
                      <h6 className="myfont3">{item.company_name}</h6>
                      <h6 className="myfont3 color-font">{item.join_date}</h6>
                      <h6 className="myfont2 mb-4">{item.description}</h6>
                      <hr />
                    </div>
                  </div>
                ))
              ) : (
                <h1>...Loading</h1>
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
export default NavTabs;
