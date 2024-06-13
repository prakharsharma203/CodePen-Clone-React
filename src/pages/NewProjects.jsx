import { useState } from "react";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import Result from "../components/Result";
import { useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { FaChevronDown, FaCss3, FaHtml5 } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FcSettings } from "react-icons/fc";
import Navbar from "../components/Navbar";
import { Alert } from "../components";

const NewProjects = () => {
  const [html_edit, setHtml_Edit] = useState("");
  const [css_edit, setCss_Edit] = useState("");
  const [js_edit, setJs_Edit] = useState("");
  const [alert, setAlert] = useState(false);

  const onChangeHtml = useCallback((value) => {
    setHtml_Edit(value);
  }, []);

  const onChangeCss = useCallback((value) => {
    setCss_Edit(value);
  }, []);

  const onChangeJavaScript = useCallback((value) => {
    setJs_Edit(value);
  }, []);

  const srcCode = `
    <html>
      <body>${html_edit}</body>
      <style>${css_edit}</style>
      <script>${js_edit}</script>
    </html>
  `;

  return (
    <>
      <div className="flex-col flex items-start justify-start h-full w-full">
        {alert && <Alert status={"Success"} alertMesg={"Project Saved..."} />}
        <Navbar
          setAlert={setAlert}
          html={html_edit}
          css={css_edit}
          js={js_edit}
          output={srcCode}
        />
        <div className="p-2">
          <Splitter style={{ height: "300px" }} layout="vertical">
            <SplitterPanel size={33} resizable={true}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <div className="bg-[#282c34] p-4 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                      <FaHtml5 className="text-xl text-red-500 " />
                      <p className="text-primaryText font-semibold">HTML</p>
                    </div>
                    <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                      <FcSettings className="text-xl" />
                      <FaChevronDown className="text-xl text-primaryText" />
                    </div>
                  </div>
                  <div style={{ width: "100%" }}>
                    <CodeMirror
                      className="text-xl border-gray-700 border"
                      value={html_edit}
                      height="600px"
                      width="405px"
                      theme="dark"
                      extensions={[html(true)]}
                      onChange={onChangeHtml}
                    />
                  </div>
                </div>
                <div className="bg-[#282c34] p-4 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                      <FaCss3 className="text-xl text-blue-500 " />
                      <p className="text-primaryText font-semibold">CSS</p>
                    </div>
                    <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                      <FcSettings className="text-xl" />
                      <FaChevronDown className="text-xl text-primaryText" />
                    </div>
                  </div>
                  <div style={{ width: "100%" }}>
                    <CodeMirror
                      className="text-xl border-gray-700 border"
                      value={css_edit}
                      height="600px"
                      theme="dark"
                      extensions={[css(true)]}
                      onChange={onChangeCss}
                    />
                  </div>
                </div>
                <div className="bg-[#282c34] p-4 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                      <IoLogoJavascript className="text-xl text-yellow-500 " />
                      <p className="text-primaryText font-semibold">
                        JavaScript
                      </p>
                    </div>
                    <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                      <FcSettings className="text-xl" />
                      <FaChevronDown className="text-xl text-primaryText" />
                    </div>
                  </div>
                  <div style={{ width: "100%" }}>
                    <CodeMirror
                      className="text-xl border-gray-700 border"
                      value={js_edit}
                      height="600px"
                      theme="dark"
                      extensions={[javascript(true)]}
                      onChange={onChangeJavaScript}
                    />
                  </div>
                </div>
              </div>
            </SplitterPanel>
            <SplitterPanel size={67} resizable={true}>
              <Result srcCode={srcCode} />
            </SplitterPanel>
          </Splitter>
        </div>
      </div>
    </>
  );
};

export default NewProjects;
