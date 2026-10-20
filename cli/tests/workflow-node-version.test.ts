/** Confere o runtime fixado no job do CLI contra o mínimo aceito pelo pacote. */
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { expect, test } from "vitest";
import { nodeVersionSupported } from "../src/prerequisites.js";

test("CI não usa uma versão de Node inferior ao mínimo do CLI", async () => {
  const workflow = await readFile(resolve(import.meta.dirname, "../../.github/workflows/specsfy.yml"), "utf8");
  const versions = [...workflow.matchAll(/node-version:\s*['"](\d+\.\d+(?:\.\d+)?)/g)].map(match=>match[1]!);
  expect(versions.length).toBeGreaterThan(0);
  for (const version of versions) expect(nodeVersionSupported(version), version).toBe(true);
});
