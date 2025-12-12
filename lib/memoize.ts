export function memoize<TArgs extends any[], TReturn>(func: (...args: TArgs) => TReturn) {
    const cache = new Map<string, TReturn>();

    return function(...args: TArgs): TReturn {
        const key = JSON.stringify(args);

        if(cache.has(key)) {
            return cache.get(key)!;
        }

        const result = func.apply(this, args);
        cache.set(key, result);
        return result;
    }
}