'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.customTasksRunner = void 0;
var default_tasks_runner_1 = require('@nx/workspace/src/tasks-runner/default-tasks-runner');
var fs = require('fs');
var fsExtra = require('fs-extra');
var path = require('path');
var CustomRemoteCache = /** @class */ (function () {
  function CustomRemoteCache(remoteDirectory) {
    var _this = this;
    this.remoteDirectory = remoteDirectory;
    this.retrieve = function (hash, cacheDirectory) {
      console.debug('CustomRemoteCache::retrieve', {
        hash: hash,
        cacheDirectory: cacheDirectory,
      });
      var hashCommit = hash + '.commit';
      var local = path.join(cacheDirectory, hash);
      var remote = path.join(_this.remoteDirectory, hash);
      var localCommit = path.join(cacheDirectory, hashCommit);
      var remoteCommit = path.join(_this.remoteDirectory, hashCommit);
      if (fs.existsSync(remote)) {
        console.debug('CustomRemoteCache::retrieve - cache hit');
        fsExtra.copySync(remote, local);
        fsExtra.copySync(remoteCommit, localCommit);
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    };
    this.store = function (hash, cacheDirectory) {
      console.debug('CustomRemoteCache::store', {
        hash: hash,
        cacheDirectory: cacheDirectory,
      });
      var hashCommit = hash + '.commit';
      var local = path.join(cacheDirectory, hash);
      var remote = path.join(_this.remoteDirectory, hash);
      var localCommit = path.join(cacheDirectory, hashCommit);
      var remoteCommit = path.join(_this.remoteDirectory, hashCommit);
      fsExtra.copySync(local, remote);
      fsExtra.copySync(localCommit, remoteCommit);
      return Promise.resolve(true);
    };
  }
  return CustomRemoteCache;
})();
var customTasksRunner = function (tasks, options, context) {
  console.debug('executing customTaskRunner');
  options.remoteCache = new CustomRemoteCache(options.remoteDirectory);
  return (0, default_tasks_runner_1.defaultTasksRunner)(
    tasks,
    options,
    context
  );
};
exports.customTasksRunner = customTasksRunner;
exports.default = exports.customTasksRunner;
