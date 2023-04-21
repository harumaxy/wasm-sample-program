import init, * as wasm from "./pkg/wasm_sample_program.js";

function jsFibbonacci(n: number): number {
  if (n <= 1) {
    return n;
  }
  return jsFibbonacci(n - 1) + jsFibbonacci(n - 2);
}

function benchmarkFib(name: string, fib: (n: number) => number, n: number) {
  return new Promise((resolve) => {
    const start = Date.now();
    fib(n);
    const end = Date.now();
    resolve(`${name}(${n}) took ${end - start}ms`);
  });
}

const n = 43;

await (async function compare() {
  const results = await Promise.all([
    benchmarkFib("JS fibonacci", jsFibbonacci, n),
    (async () => {
      await init();
      return benchmarkFib("Wasm fibonacci", wasm.fibonacci, n);
    })(),
  ]);

  console.log(results.join("\n"));
})();
