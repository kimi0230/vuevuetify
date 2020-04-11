// 動態載入頁面
export const loadView = (view, path) => {
    let hasPath = !!path;
    return () =>
        hasPath ?
        import(
            `@VIEW/${path}/${view}.vue`
        ) :
        import(`@VIEW/${view}.vue`);
};

// 動態載入Layout
export const loadLayoutView = (view, path) => {
    let hasPath = !!path;
    return () =>
        hasPath ?
        import(
            `@LAYOUT/${path}/${view}.vue`
        ) :
        import(`@LAYOUT/${view}.vue`);
};