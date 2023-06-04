module.exports = {
    roots: ["<rootDir>/tests"],
    transform: {
        '^.+\\.tsx?$': 'babel-jest',
      },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
}