'use strict';

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('pdfjs/display/global', ['exports', 'pdfjs/shared/util', 'pdfjs/display/dom_utils', 'pdfjs/display/api', 'pdfjs/display/annotation_layer', 'pdfjs/display/text_layer', 'pdfjs/display/metadata', 'pdfjs/display/svg', 'pdfjs/display/forms'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('../shared/util.js'), require('./dom_utils.js'), require('./api.js'), require('./annotation_layer.js'), require('./text_layer.js'), require('./metadata.js'), require('./svg.js'), require('./forms.js'));
  } else {
    factory(root.pdfjsDisplayGlobal = {}, root.pdfjsSharedUtil, root.pdfjsDisplayDOMUtils, root.pdfjsDisplayAPI, root.pdfjsDisplayAnnotationLayer, root.pdfjsDisplayTextLayer, root.pdfjsDisplayMetadata, root.pdfjsDisplaySVG, root.pdfjsDisplayForms);
  }
})(void 0, function (exports, sharedUtil, displayDOMUtils, displayAPI, displayAnnotationLayer, displayTextLayer, displayMetadata, displaySVG, displayForms) {
  var globalScope = sharedUtil.globalScope;
  var deprecated = sharedUtil.deprecated;
  var warn = sharedUtil.warn;
  var LinkTarget = displayDOMUtils.LinkTarget;
  var isWorker = typeof window === 'undefined';

  if (!globalScope.PDFJS) {
    globalScope.PDFJS = {};
  }

  var PDFJS = globalScope.PDFJS;

  if (typeof pdfjsVersion !== 'undefined') {
    PDFJS.version = pdfjsVersion;
  }

  if (typeof pdfjsBuild !== 'undefined') {
    PDFJS.build = pdfjsBuild;
  }

  PDFJS.pdfBug = false;

  if (PDFJS.verbosity !== undefined) {
    sharedUtil.setVerbosityLevel(PDFJS.verbosity);
  }

  delete PDFJS.verbosity;
  Object.defineProperty(PDFJS, 'verbosity', {
    get: function () {
      return sharedUtil.getVerbosityLevel();
    },
    set: function (level) {
      sharedUtil.setVerbosityLevel(level);
    },
    enumerable: true,
    configurable: true
  });
  PDFJS.VERBOSITY_LEVELS = sharedUtil.VERBOSITY_LEVELS;
  PDFJS.OPS = sharedUtil.OPS;
  PDFJS.UNSUPPORTED_FEATURES = sharedUtil.UNSUPPORTED_FEATURES;
  PDFJS.isValidUrl = displayDOMUtils.isValidUrl;
  PDFJS.shadow = sharedUtil.shadow;
  PDFJS.createBlob = sharedUtil.createBlob;

  PDFJS.createObjectURL = function PDFJS_createObjectURL(data, contentType) {
    return sharedUtil.createObjectURL(data, contentType, PDFJS.disableCreateObjectURL);
  };

  Object.defineProperty(PDFJS, 'isLittleEndian', {
    configurable: true,
    get: function PDFJS_isLittleEndian() {
      var value = sharedUtil.isLittleEndian();
      return sharedUtil.shadow(PDFJS, 'isLittleEndian', value);
    }
  });
  PDFJS.removeNullCharacters = sharedUtil.removeNullCharacters;
  PDFJS.PasswordResponses = sharedUtil.PasswordResponses;
  PDFJS.PasswordException = sharedUtil.PasswordException;
  PDFJS.UnknownErrorException = sharedUtil.UnknownErrorException;
  PDFJS.InvalidPDFException = sharedUtil.InvalidPDFException;
  PDFJS.MissingPDFException = sharedUtil.MissingPDFException;
  PDFJS.UnexpectedResponseException = sharedUtil.UnexpectedResponseException;
  PDFJS.Util = sharedUtil.Util;
  PDFJS.PageViewport = sharedUtil.PageViewport;
  PDFJS.createPromiseCapability = sharedUtil.createPromiseCapability;
  PDFJS.maxImageSize = PDFJS.maxImageSize === undefined ? -1 : PDFJS.maxImageSize;
  PDFJS.cMapUrl = PDFJS.cMapUrl === undefined ? null : PDFJS.cMapUrl;
  PDFJS.cMapPacked = PDFJS.cMapPacked === undefined ? false : PDFJS.cMapPacked;
  PDFJS.disableFontFace = PDFJS.disableFontFace === undefined ? false : PDFJS.disableFontFace;
  PDFJS.imageResourcesPath = PDFJS.imageResourcesPath === undefined ? '' : PDFJS.imageResourcesPath;
  PDFJS.disableWorker = PDFJS.disableWorker === undefined ? false : PDFJS.disableWorker;
  PDFJS.workerSrc = PDFJS.workerSrc === undefined ? null : PDFJS.workerSrc;
  PDFJS.disableRange = PDFJS.disableRange === undefined ? false : PDFJS.disableRange;
  PDFJS.disableStream = PDFJS.disableStream === undefined ? false : PDFJS.disableStream;
  PDFJS.disableAutoFetch = PDFJS.disableAutoFetch === undefined ? false : PDFJS.disableAutoFetch;
  PDFJS.pdfBug = PDFJS.pdfBug === undefined ? false : PDFJS.pdfBug;
  PDFJS.postMessageTransfers = PDFJS.postMessageTransfers === undefined ? true : PDFJS.postMessageTransfers;
  PDFJS.disableCreateObjectURL = PDFJS.disableCreateObjectURL === undefined ? false : PDFJS.disableCreateObjectURL;
  PDFJS.disableWebGL = PDFJS.disableWebGL === undefined ? true : PDFJS.disableWebGL;
  PDFJS.externalLinkTarget = PDFJS.externalLinkTarget === undefined ? LinkTarget.NONE : PDFJS.externalLinkTarget;
  PDFJS.externalLinkRel = PDFJS.externalLinkRel === undefined ? 'noreferrer' : PDFJS.externalLinkRel;
  PDFJS.isEvalSupported = PDFJS.isEvalSupported === undefined ? true : PDFJS.isEvalSupported;
  var savedOpenExternalLinksInNewWindow = PDFJS.openExternalLinksInNewWindow;
  delete PDFJS.openExternalLinksInNewWindow;
  Object.defineProperty(PDFJS, 'openExternalLinksInNewWindow', {
    get: function () {
      return PDFJS.externalLinkTarget === LinkTarget.BLANK;
    },
    set: function (value) {
      if (value) {
        deprecated('PDFJS.openExternalLinksInNewWindow, please use ' + '"PDFJS.externalLinkTarget = PDFJS.LinkTarget.BLANK" instead.');
      }

      if (PDFJS.externalLinkTarget !== LinkTarget.NONE) {
        warn('PDFJS.externalLinkTarget is already initialized');
        return;
      }

      PDFJS.externalLinkTarget = value ? LinkTarget.BLANK : LinkTarget.NONE;
    },
    enumerable: true,
    configurable: true
  });

  if (savedOpenExternalLinksInNewWindow) {
    PDFJS.openExternalLinksInNewWindow = savedOpenExternalLinksInNewWindow;
  }

  PDFJS.getDocument = displayAPI.getDocument;
  PDFJS.PDFDataRangeTransport = displayAPI.PDFDataRangeTransport;
  PDFJS.PDFWorker = displayAPI.PDFWorker;
  Object.defineProperty(PDFJS, 'hasCanvasTypedArrays', {
    configurable: true,
    get: function PDFJS_hasCanvasTypedArrays() {
      var value = displayDOMUtils.hasCanvasTypedArrays();
      return sharedUtil.shadow(PDFJS, 'hasCanvasTypedArrays', value);
    }
  });
  PDFJS.CustomStyle = displayDOMUtils.CustomStyle;
  PDFJS.LinkTarget = LinkTarget;
  PDFJS.addLinkAttributes = displayDOMUtils.addLinkAttributes;
  PDFJS.getFilenameFromUrl = displayDOMUtils.getFilenameFromUrl;
  PDFJS.isExternalLinkTargetSet = displayDOMUtils.isExternalLinkTargetSet;
  PDFJS.AnnotationLayer = displayAnnotationLayer.AnnotationLayer;
  PDFJS.renderTextLayer = displayTextLayer.renderTextLayer;
  PDFJS.Metadata = displayMetadata.Metadata;
  PDFJS.SVGGraphics = displaySVG.SVGGraphics;
  PDFJS.FormFunctionality = displayForms.FormFunctionality;
  PDFJS.UnsupportedManager = displayAPI._UnsupportedManager;
  exports.globalScope = globalScope;
  exports.isWorker = isWorker;
  exports.PDFJS = globalScope.PDFJS;
});