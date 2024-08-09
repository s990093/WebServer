"use client";
import { useEffect, useState } from "react";
import ScriptList from "./components/ScriptList";
import ScriptExecutionPanel from "./components/ScriptExecutionPanel";
import ExecutionResult from "./components/ExecutionResult";
import { ExecutionDetail, Script } from "./interface/script";
import axios, { AxiosError } from "axios";
import { DJANGO_URL } from "./constant";
import { Coming_Soon } from "next/font/google";
import ErrorCard from "./components/ErrorCard";

const Home: React.FC = () => {
  const [selectedScript, setSelectedScript] = useState<Script>();
  const [executionResult, setExecutionResult] = useState<string>("");
  const [scripts, setScripts] = useState<Script[]>([]);
  const [result, Setresult] = useState<ExecutionDetail>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(DJANGO_URL("web/api/scripts/"))
      .then((response) => {
        setScripts(response.data);
      })
      .catch((error) => {
        setErrorMessage(String(error));
        console.error("There was an error fetching the scripts!", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedScript !== undefined) {
        try {
          const response = await axios.get<ExecutionDetail>(
            DJANGO_URL(`web/api/scripts/${selectedScript.id}/log/`)
          );
          Setresult(response.data);
        } catch (error) {
          setErrorMessage(String(error));
        }
      }
    };

    fetchData();
  }, [selectedScript]);
  const handleCloseErrorCard = () => {
    setErrorMessage(null);
  };

  const handleChangeScriptStatus = (scriptId: number, status: string) => {
    setScripts((prevScripts) =>
      prevScripts.map((script) =>
        script.id === scriptId ? { ...script, status } : script
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl text-center py-6">
        PowerShell Script Control Panel
      </h1>
      <div className="flex justify-center">
        <div className="w-1/2 p-4">
          <ScriptList
            onSelectScript={setSelectedScript}
            scripts={scripts}
            onChangeScriptStatus={handleChangeScriptStatus}
            onError={function (error: string): void {
              setErrorMessage(error);
            }}
          />
        </div>
        <div className="w-1/2 p-4">
          {/* <ScriptExecutionPanel
            selectedScriptx={selectedScript}
            onExecutionComplete={setExecutionResult}
          />
          <div className="my-4 border-t border-gray-700" /> */}

          {result && <ExecutionResult result={result} />}
        </div>
      </div>
      {errorMessage && (
        <ErrorCard message={errorMessage} onClose={handleCloseErrorCard} />
      )}
    </div>
  );
};

export default Home;
