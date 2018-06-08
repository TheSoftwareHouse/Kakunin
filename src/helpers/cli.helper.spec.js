import { isInitCommand, createTagsCLIArgument, getConfigPath, filterCLIArguments } from './cli.helper';
import { expect } from 'chai';

describe('Cli helpers', () => {
  it('returns false if missing parameters for init command', () => {
    expect(isInitCommand()).to.be.equal(false);
  });

  it('returns false if args is not an array', () => {
    expect(isInitCommand('some-args')).to.be.equal(false);
  });

  it('returns false when args length is lower than 2', () => {
    expect(isInitCommand(['arg1'])).to.be.equal(false);
  });

  it('returns false when third argument is not init', () => {
    expect(isInitCommand(['arg1', 'arg2', 'arg3'])).to.be.equal(false);
  });

  it('returns true when third argument is init', () => {
    expect(isInitCommand(['arg1', 'arg2', 'init'])).to.be.equal(true);
  });

  it('returns default config path', () => {
    expect(getConfigPath('some-file.config.js', undefined, '/my/path')).to.be.equal('/my/path/some-file.config.js')
  });

  it('returns config path by config file', () => {
    expect(getConfigPath('some-file.config.js', 'other-config.js', '/my/path')).to.be.equal('/my/path/other-config.js')
  });

  it('creates empty tags cli argument if neither performance nor tags param is defined', () => {
    expect(createTagsCLIArgument({})).to.be.eql([]);
  });

  it('creates cli argument without performance flag if only cucumber tags passed', () => {
    expect(createTagsCLIArgument({
      tags: '@some-tag and @other-tag'
    })).to.be.eql([
      '--cucumberOpts.tags',
      '@some-tag and @other-tag'
    ]);
  });

  it('creates cli argument with performance flag but without performance tag and without cucumber tags', () => {
    expect(createTagsCLIArgument({
      performance: true
    })).to.be.eql([
      '--cucumberOpts.tags',
      '@performance'
    ]);
  });

  it('creates cli argument with performance flag but without performance tag and with cucumber tags', () => {
    expect(createTagsCLIArgument({
      performance: true,
      tags: '@some-tag and @other-tag'
    })).to.be.eql([
      '--cucumberOpts.tags',
      '@some-tag and @other-tag and @performance'
    ]);
  });

  it('creates cli argument with performance flag but with performance tag and with cucumber tags', () => {
    expect(createTagsCLIArgument({
      performance: true,
      tags: '@some-tag and @other-tag and @performance'
    })).to.be.eql([
      '--cucumberOpts.tags',
      '@some-tag and @other-tag and @performance'
    ]);
  });

  it('adds only not black listed arguments', () => {
    expect(filterCLIArguments(['myArg'])({
      myArg: true,
      otherArgument: false
    })).to.be.eql([
      '--otherArgument'
    ]);
  });

  it('adds bool not black listed arguments without parameters', () => {
    expect(filterCLIArguments(['myArg'])({
      myArg: true,
      otherArgument: false
    })).to.be.eql([
      '--otherArgument'
    ]);
  });

  it('adds string not black listed arguments with parameters', () => {
    expect(filterCLIArguments(['myArg'])({
      myArg: 'some-value',
      otherArgument: 'some-value'
    })).to.be.eql([
      '--otherArgument=some-value'
    ]);
  });
});