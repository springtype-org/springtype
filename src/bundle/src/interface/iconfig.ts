export interface IConfig {
  typeChecker?: {
    // base path
    basePath?: string;

    // path to tsconfig file (from basepath)
    tsConfig?: string;

    // path to tsconfig file (from basepath)
    tsConfigOverride?: object;

    throwOnSyntactic?: boolean;
    throwOnSemantic?: boolean;
    throwOnGlobal?: boolean;
    throwOnOptions?: boolean;

    // name that will be displayed on cmd echo
    name?: string;

    // use shortened filenames in order to make output less cluttered
    shortenFilenames?: boolean; // default true

    // skip ts errors
    skipTsErrors?: number[];

    // plugin options
    printFirstRun: boolean; // default true when used as plugin

    // print settings
    print_summary?: boolean; //default false
    print_runtime?: boolean; //default false

    // internals
    tsConfigJsonContent: any;
    isPlugin: boolean;
    basePathSetup?: string;
    homeDir: string;
  };
  root?: string;
  target?: "browser" | "server" | "electron" | "universal" | "web-worker";
  useSingleBundle?: boolean;
  dependencies?: {
    include?: Array<string>;
    ignorePackages?: Array<string>;
    ignoreAllExternal?: boolean;
  };
  homeDir?: string;
  output?: string;
  modules?: Array<string>;
  logging?: {
    level?: "succinct" | "verbose" | "disabled";
    ignoreStatementErrors?: Array<string>;
  };
  webWorkers?: {
    enabled?: boolean;
    config?: IConfig;
  };

  codeSplitting?: {
    scriptRoot?: string;

    /**
     * limit the filename to the last portion of the input path if total length exceeded.
     *
     * For example Import('./site/about/about.module').then(m => m.AboutModule) would yield
     *    (20) => 'about.module.js'
     *    (0) =>  'site-about-about.module.js'
     *
     * default: 20
     */
    maxPathLength?: number;

    /**
     * Prefix the lazy loaded module with a hash of the file contents.
     *
     * For example Import('./site/about/about.module').then(m => m.AboutModule) would yield
     *    (true) => '016ee59f7-site-about-about.module.js'
     *    (false) =>  'site-about-about.module.js'
     *
     * default: true
     */
    useHash?: boolean;
  };

  watch?:
    | boolean
    | {
        paths?: any;
        skipRecommendedIgnoredPaths?: boolean;
        ignored?: Array<string | RegExp>;
        banned?: Array<string>;
        chokidar?: any; // import { WatchOptions } from 'chokidar';
      };

  resources?: {
    /**
     * e.g /public will re-write all URLS to have have /public/image.jpg instead of /image.jpg
     * Default value is "/resources"
     * @type {string}
     * @memberof IStyleSheetProps
     */
    resourcePublicRoot?: string;

    /**
     * A folder in the file system where the sources are copied
     * By providing a relative path e.g "public" FuseBox will join it with the current output Directory
     * it's possible to complelely override it by providing an absolute path;
     * Default value is : "{YOUR_DIST_FOLDER}/resources"
     * @type {string}
     * @memberof IStyleSheetProps
     */
    resourceFolder?: string;
  };

  json?: {
    useDefault?: boolean;
    path?: string;
  };
  link?: {
    useDefault?: boolean;
    resourcePublicRoot?: string;
  };

  /**
   * Environment variables. Values can be strings only
   * Default values for development and production:
   * NODE_ENV=development|production
   * @type {{ [key: string]: string }}
   * @memberof IPublicConfig
   */
  env?: { [key: string]: string };

  hmr?:
    | boolean
    | {
        reloadEntryOnStylesheet?: boolean;
      };
  stylesheet?: {
    /**
     * e.g /public will re-write all URLS to have have /public/image.jpg instead of /image.jpg
     * Default value is "/resources"
     * @type {string}
     * @memberof IStyleSheetProps
     */
    resourcePublicRoot?: string;

    /**
     * A folder in the file system where the sources are copied
     * By providing a relative path e.g "public" FuseBox will join it with the current output Directory
     * it's possible to complelely override it by providing an absolute path;
     * Default value is : "{YOUR_DIST_FOLDER}/resources"
     * @type {string}
     * @memberof IStyleSheetProps
     */
    resourceFolder?: string;

    /**
     * By default, FuseBox checks if a file has been copied over and exists in the dest file.
     * That saves some time on bundling, but also ignores a modified resource (for example an image with the same name)
     * Toggle this on if you work images that are copied over and over again with the same name
     * @type {boolean}
     * @memberof IStyleSheetProps
     */
    ignoreChecksForCopiedResources?: boolean;

    /**
     * If toggled all stylesheet module will break its dependant cache and will be forced to be reloaded
     *
     * @type {boolean}
     * @memberof IStyleSheetProps
     */
    breakDependantsCache?: boolean;

    /**
     * Files will be grouped in folder by type
     * e.g images.jpg will go into "resources/images/image.jpg"
     * font.ogg will go into "resources/fonts/font.ogg"
     * Default value is "true"
     * @type {boolean}
     * @memberof IStyleSheetProps
     */
    groupResourcesFilesByType?: boolean;

    /**
     * Path lookup. Similar to the ones most CSS preprocessor provide
     * It's recommended to use macro option instead as this options adds additional overhead
     *
     * @type {Array<string>}
     * @memberof IStyleSheetProps
     */
    paths?: Array<string>;

    /**
     * Auto import resources at paths
     */
    autoImport?: Array<{
      capture?: string | RegExp;
      file: string;
    }>;

    /**
     * Helps to resolve urls and untangle the paths
     * e.g provide `{ $src : path.join(__dirname, "src")}`
     * in order to use `@import "$src/some.scss"` or `background-image: url("$src/images/logo.png")`
     * Replaces values "as is" therefore you should take care of prefixes. Giving it just a string "src" or "a" will result
     * in replacing all values in the string and breaking the path.
     * @type {{ [key: string]: string }}
     * @memberof IStyleSheetProps
     */
    macros?: { [key: string]: string };
    sass?: {
      macros?: { [key: string]: string };
    };
    postCSS?: {
      plugins: Array<any>;
    };
    less?: {
      plugins: Array<any>;
      options: any;
    };
  };
  cache?:
    | boolean
    | {
        enabled?: boolean;
        root?: string;
        FTL?: boolean;
      };
  tsConfig?:
    | string
    | {
        target?: "ES3" | "ES5" | "ES6" | "ES2015" | "ES2016" | "ES2017" | "ESNext";
        module?: string;
        baseUrl?: string;
        sourceMap?: boolean;
        inlineSources?: boolean;
        allowJs?: boolean;
        paths?: { [key: string]: Array<string> };
        jsxFactory?: string;
        moduleResolution?: string;
        jsx?: string;
        mod?: any;
        importHelpers?: boolean;
        experimentalDecorators?: boolean;
        emitDecoratorMetadata?: boolean;
        declaration?: boolean;
      };
  entry?: string | Array<string>;
  allowSyntheticDefaultImports?: boolean;
  webIndex?:
    | {
        enabled?: boolean;
        target?: string;
        template?: string;
        distFileName?: string;
        publicPath?: string;
        embedIndexedBundles?: boolean;
      }
    | boolean;
  turboMode?:
    | {
        maxWorkers?: number;
        workerPortsRange?: { start: number; end: number };
        workerPorts?: Array<number>;
      }
    | boolean;
  sourceMap?:
    | {
        sourceRoot?: string;
        vendor?: boolean;
        project?: boolean;
        css?: boolean;
      }
    | boolean;
  plugins?: Array<(ctx: any) => void>;
  alias?: { [key: string]: string };

  // read only
  defaultCollectionName?: string;

  devServer?:
    | {
        enabled?: boolean;
        open?:
          | boolean
          | {
              background?: boolean; // mac os only
              wait?: boolean;
              target?: string;
              app?: string | Array<string>;
            };
        proxy?: Array<{
          path: string;
          options: any;
        }>;
        httpServer?:
          | {
              enabled?: boolean;
              port?: number;
              fallback?: string;
              root?: string;
              express?: (app: any, express: any) => void;
            }
          | boolean;
        hmrServer?:
          | {
              enabled?: boolean;
              useCurrentURL?: boolean;
              port?: number;
              connectionURL?: string;
            }
          | boolean;
      }
    | boolean
    | undefined;

  cacheObject?: Cache;
}
