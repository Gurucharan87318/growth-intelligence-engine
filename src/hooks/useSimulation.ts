"use client";

import { useEffect, useMemo, useState } from "react";

import {
  simulateBusinessModel,
  BusinessModelConfig,
  SimulationResult,
} from "@/lib/analytics/simulationMath";

const BUSINESS_MODELS: BusinessModelConfig[] = [
  {
    name: "SaaS",
    defaultCac: 350,
    defaultArpu: 89,
    defaultRetention: 0.92,
    retentionLabel: "Monthly Retention",
    months: 12,
  },
  {
    name: "E-commerce",
    defaultCac: 45,
    defaultArpu: 125,
    defaultRetention: 0.25,
    retentionLabel: "Repeat Purchase Rate",
    months: 12,
  },
  {
    name: "Marketplace",
    defaultCac: 28,
    defaultArpu: 42,
    defaultRetention: 0.68,
    retentionLabel: "Monthly Retention",
    months: 12,
  },
];

export type SimulationSnapshot = {
  model: BusinessModelConfig;
  cac: number;
  arpu: number;
  retention: number;
  result: SimulationResult;
};

export function useSimulation() {
  const [model, setModel] = useState<BusinessModelConfig>(BUSINESS_MODELS[0]);
  const [cac, setCac] = useState<number>(BUSINESS_MODELS[0].defaultCac);
  const [arpu, setArpu] = useState<number>(BUSINESS_MODELS[0].defaultArpu);
  const [retention, setRetention] = useState<number>(
    BUSINESS_MODELS[0].defaultRetention
  );
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [baseline, setBaseline] = useState<SimulationSnapshot | null>(null);

  const availableModels = useMemo(() => BUSINESS_MODELS, []);

  const resetToDefaults = (selectedModel: BusinessModelConfig) => {
    setModel(selectedModel);
    setCac(selectedModel.defaultCac);
    setArpu(selectedModel.defaultArpu);
    setRetention(selectedModel.defaultRetention);
  };

  const setModelByName = (modelName: BusinessModelConfig["name"]) => {
    const selected = BUSINESS_MODELS.find((item) => item.name === modelName);
    if (selected) {
      resetToDefaults(selected);
    }
  };

  const takeSnapshot = () => {
    const snapshotResult = simulateBusinessModel(cac, arpu, retention, model);

    setBaseline({
      model,
      cac,
      arpu,
      retention,
      result: snapshotResult,
    });
  };

  const clearSnapshot = () => {
    setBaseline(null);
  };

  useEffect(() => {
    const simulation = simulateBusinessModel(cac, arpu, retention, model);
    setResult(simulation);
  }, [cac, arpu, retention, model]);

  return {
    model,
    cac,
    arpu,
    retention,
    result,
    baseline,
    availableModels,
    actions: {
      setCac,
      setArpu,
      setRetention,
      setModel,
      setModelByName,
      resetToDefaults,
      takeSnapshot,
      clearSnapshot,
    },
  };
}
