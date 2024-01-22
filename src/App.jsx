import { useDeferredValue, useEffect, useState } from "react";
import { FaHtml5, FaCss3Alt, FaCode } from "react-icons/fa";
import CodeEdit from "./component/CodeEdit";
import useLocalStorage from "./hook/useLocalStorage";

function App() {
  const [js, setJs] = useLocalStorage("js", "");
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [srcDoc, setSrcDoc] = useState("");

  const deferSrcDoc = useDeferredValue(srcDoc);

  useEffect(() => {
    setSrcDoc(`
      <html>
        <body>
          ${html}
        </body>
        <style>${css}</style>
        <js>${js}</js>
      </html>
    `);
  }, [html, css, js]);

  useDeferredValue;

  return (
    <div className="h-svh grid grid-rows-2 gap-y-4 bg-slate-800">
      <div className="bg-gray-800 flex gap-x-4 p-4 pb-0">
        <CodeEdit
          language="html"
          title={"HTML"}
          value={html}
          onChange={setHtml}
          renderIcon={() => <FaHtml5 />}
        />
        <CodeEdit
          language="css"
          title={"CSS"}
          value={css}
          onChange={setCss}
          renderIcon={() => <FaCss3Alt />}
        />
        <CodeEdit
          language="javascript"
          title={"JS"}
          value={js}
          onChange={setJs}
          renderIcon={() => <FaCode />}
        />
      </div>
      <div className="bg-gray-900 border border-slate-400 m-4 mt-0">
        <iframe
          srcDoc={deferSrcDoc}
          title="output"
          height="100%"
          width="100%"
          frameBorder={0}
          sandbox="allow-scripts"
        ></iframe>
      </div>
    </div>
  );
}

export default App;
