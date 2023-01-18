import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
    verbose: true,
    testEnvironment: 'jsdom',
    // transformIgnorePatterns: ['node_modules/(?!axios)/'],
    moduleNameMapper: {
        '\\.(css|scss)$': '<rootDir>/test/__mocks__/styleMock.js',
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '\\.[jt]sx?$': 'babel-jest',
    },
}
export default config
