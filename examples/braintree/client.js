!function(e) {
    var t;
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : ((t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).braintree || (t.braintree = {})).client = e()
}(function() {
    return function n(i, o, a) {
        function s(t, e) {
            if (!o[t]) {
                if (!i[t]) {
                    var r = "function" == typeof require && require;
                    if (!e && r)
                        return r(t, !0);
                    if (c)
                        return c(t, !0);
                    throw (r = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND",
                    r
                }
                r = o[t] = {
                    exports: {}
                },
                i[t][0].call(r.exports, function(e) {
                    return s(i[t][1][e] || e)
                }, r, r.exports, n, i, o, a)
            }
            return o[t].exports
        }
        for (var c = "function" == typeof require && require, e = 0; e < a.length; e++)
            s(a[e]);
        return s
    }({
        1: [function(e, t, r) {
            "use strict";
            var n = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            ;
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.PromiseGlobal = void 0;
            e = n(e("promise-polyfill")),
            e = "undefined" != typeof Promise ? Promise : e.default;
            r.PromiseGlobal = e
        }
        , {
            "promise-polyfill": 15
        }],
        2: [function(e, t, r) {
            "use strict";
            var a = e("./lib/promise")
              , s = {};
            function n(r) {
                var e, t = JSON.stringify(r);
                if (!r.forceScriptReload && (e = s[t]))
                    return e;
                var n = document.createElement("script")
                  , i = r.dataAttributes || {}
                  , o = r.container || document.head;
                return n.src = r.src,
                n.id = r.id || "",
                n.async = !0,
                r.crossorigin && n.setAttribute("crossorigin", "" + r.crossorigin),
                Object.keys(i).forEach(function(e) {
                    n.setAttribute("data-" + e, "" + i[e])
                }),
                e = new a.PromiseGlobal(function(e, t) {
                    n.addEventListener("load", function() {
                        e(n)
                    }),
                    n.addEventListener("error", function() {
                        t(new Error(r.src + " failed to load."))
                    }),
                    n.addEventListener("abort", function() {
                        t(new Error(r.src + " has aborted."))
                    }),
                    o.appendChild(n)
                }
                ),
                s[t] = e
            }
            n.clearCache = function() {
                s = {}
            }
            ,
            t.exports = n
        }
        , {
            "./lib/promise": 1
        }],
        3: [function(e, t, r) {
            t.exports = e("./dist/load-script")
        }
        , {
            "./dist/load-script": 2
        }],
        4: [function(e, t, r) {
            "use strict";
            var n = e("./is-ie11");
            t.exports = function(e) {
                return -1 !== (e = e || window.navigator.userAgent).indexOf("MSIE") || n(e)
            }
        }
        , {
            "./is-ie11": 5
        }],
        5: [function(e, t, r) {
            "use strict";
            t.exports = function(e) {
                return -1 !== (e = e || window.navigator.userAgent).indexOf("Trident/7")
            }
        }
        , {}],
        6: [function(e, t, r) {
            "use strict";
            t.exports = function(e) {
                return -1 !== (e = e || window.navigator.userAgent).indexOf("MSIE 9")
            }
        }
        , {}],
        7: [function(e, t, r) {
            t.exports = e("./dist/is-ie")
        }
        , {
            "./dist/is-ie": 4
        }],
        8: [function(e, t, r) {
            t.exports = e("./dist/is-ie9")
        }
        , {
            "./dist/is-ie9": 6
        }],
        9: [function(e, t, r) {
            "use strict";
            var n = "undefined" != typeof Promise ? Promise : null
              , n = (i.defaultOnResolve = function(e) {
                return i.Promise.resolve(e)
            }
            ,
            i.defaultOnReject = function(e) {
                return i.Promise.reject(e)
            }
            ,
            i.setPromise = function(e) {
                i.Promise = e
            }
            ,
            i.shouldCatchExceptions = function(e) {
                return e.hasOwnProperty("suppressUnhandledPromiseMessage") ? Boolean(e.suppressUnhandledPromiseMessage) : Boolean(i.suppressUnhandledPromiseMessage)
            }
            ,
            i.all = function(e) {
                return i.Promise.all(e)
            }
            ,
            i.allSettled = function(e) {
                return i.Promise.allSettled(e)
            }
            ,
            i.race = function(e) {
                return i.Promise.race(e)
            }
            ,
            i.reject = function(e) {
                return i.Promise.reject(e)
            }
            ,
            i.resolve = function(e) {
                return i.Promise.resolve(e)
            }
            ,
            i.prototype.then = function() {
                for (var e, t = [], r = 0; r < arguments.length; r++)
                    t[r] = arguments[r];
                return (e = this._promise).then.apply(e, t)
            }
            ,
            i.prototype.catch = function() {
                for (var e, t = [], r = 0; r < arguments.length; r++)
                    t[r] = arguments[r];
                return (e = this._promise).catch.apply(e, t)
            }
            ,
            i.prototype.resolve = function(e) {
                var t = this;
                return this.isFulfilled || (this._setResolved(),
                i.Promise.resolve().then(function() {
                    return t._onResolve(e)
                }).then(function(e) {
                    t._resolveFunction(e)
                }).catch(function(e) {
                    t._resetState(),
                    t.reject(e)
                })),
                this
            }
            ,
            i.prototype.reject = function(e) {
                var t = this;
                return this.isFulfilled || (this._setRejected(),
                i.Promise.resolve().then(function() {
                    return t._onReject(e)
                }).then(function(e) {
                    t._setResolved(),
                    t._resolveFunction(e)
                }).catch(function(e) {
                    return t._rejectFunction(e)
                })),
                this
            }
            ,
            i.prototype._resetState = function() {
                this.isFulfilled = !1,
                this.isResolved = !1,
                this.isRejected = !1
            }
            ,
            i.prototype._setResolved = function() {
                this.isFulfilled = !0,
                this.isResolved = !0,
                this.isRejected = !1
            }
            ,
            i.prototype._setRejected = function() {
                this.isFulfilled = !0,
                this.isResolved = !1,
                this.isRejected = !0
            }
            ,
            i.Promise = n,
            i);
            function i(e) {
                var r = this;
                "function" != typeof e ? (this._promise = new i.Promise(function(e, t) {
                    r._resolveFunction = e,
                    r._rejectFunction = t
                }
                ),
                this._onResolve = (e = e || {}).onResolve || i.defaultOnResolve,
                this._onReject = e.onReject || i.defaultOnReject,
                i.shouldCatchExceptions(e) && this._promise.catch(function() {}),
                this._resetState()) : this._promise = new i.Promise(e)
            }
            t.exports = n
        }
        , {}],
        10: [function(e, t, r) {
            "use strict";
            t.exports = function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                    var t = 16 * Math.random() | 0;
                    return ("x" === e ? t : 3 & t | 8).toString(16)
                })
            }
        }
        , {}],
        11: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.deferred = function(r) {
                return function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    setTimeout(function() {
                        try {
                            r.apply(void 0, e)
                        } catch (e) {
                            console.log("Error in callback function"),
                            console.log(e)
                        }
                    }, 1)
                }
            }
        }
        , {}],
        12: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.once = function(r) {
                var n = !1;
                return function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    n || (n = !0,
                    r.apply(void 0, e))
                }
            }
        }
        , {}],
        13: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.promiseOrCallback = function(e, t) {
                if (!t)
                    return e;
                e.then(function(e) {
                    return t(null, e)
                }).catch(function(e) {
                    return t(e)
                })
            }
        }
        , {}],
        14: [function(e, t, r) {
            "use strict";
            var i = e("./lib/deferred")
              , o = e("./lib/once")
              , a = e("./lib/promise-or-callback");
            function s(n) {
                return function() {
                    for (var e, t = [], r = 0; r < arguments.length; r++)
                        t[r] = arguments[r];
                    return "function" == typeof t[t.length - 1] && (e = t.pop(),
                    e = o.once(i.deferred(e))),
                    a.promiseOrCallback(n.apply(this, t), e)
                }
            }
            s.wrapPrototype = function(n, e) {
                var i = (e = void 0 === e ? {} : e).ignoreMethods || []
                  , o = !0 === e.transformPrivateMethods;
                return Object.getOwnPropertyNames(n.prototype).filter(function(e) {
                    var t = "constructor" !== e && "function" == typeof n.prototype[e]
                      , r = -1 === i.indexOf(e)
                      , e = o || "_" !== e.charAt(0);
                    return t && e && r
                }).forEach(function(e) {
                    var t = n.prototype[e];
                    n.prototype[e] = s(t)
                }),
                n
            }
            ,
            t.exports = s
        }
        , {
            "./lib/deferred": 11,
            "./lib/once": 12,
            "./lib/promise-or-callback": 13
        }],
        15: [function(e, t, r) {
            "use strict";
            var n = setTimeout
              , i = "undefined" != typeof setImmediate ? setImmediate : null;
            function c(e) {
                return Boolean(e && void 0 !== e.length)
            }
            function o() {}
            function a(e) {
                if (!(this instanceof a))
                    throw new TypeError("Promises must be constructed via new");
                if ("function" != typeof e)
                    throw new TypeError("not a function");
                this._state = 0,
                this._handled = !1,
                this._value = void 0,
                this._deferreds = [],
                f(e, this)
            }
            function s(r, n) {
                for (; 3 === r._state; )
                    r = r._value;
                0 !== r._state ? (r._handled = !0,
                a._immediateFn(function() {
                    var e, t = 1 === r._state ? n.onFulfilled : n.onRejected;
                    if (null !== t) {
                        try {
                            e = t(r._value)
                        } catch (e) {
                            return void d(n.promise, e)
                        }
                        u(n.promise, e)
                    } else
                        (1 === r._state ? u : d)(n.promise, r._value)
                })) : r._deferreds.push(n)
            }
            function u(t, e) {
                try {
                    if (e === t)
                        throw new TypeError("A promise cannot be resolved with itself.");
                    if (e && ("object" == typeof e || "function" == typeof e)) {
                        var r = e.then;
                        if (e instanceof a)
                            return t._state = 3,
                            t._value = e,
                            void p(t);
                        if ("function" == typeof r)
                            return void f((n = r,
                            i = e,
                            function() {
                                n.apply(i, arguments)
                            }
                            ), t)
                    }
                    t._state = 1,
                    t._value = e,
                    p(t)
                } catch (e) {
                    d(t, e)
                }
                var n, i
            }
            function d(e, t) {
                e._state = 2,
                e._value = t,
                p(e)
            }
            function p(e) {
                2 === e._state && 0 === e._deferreds.length && a._immediateFn(function() {
                    e._handled || a._unhandledRejectionFn(e._value)
                });
                for (var t = 0, r = e._deferreds.length; t < r; t++)
                    s(e, e._deferreds[t]);
                e._deferreds = null
            }
            function l(e, t, r) {
                this.onFulfilled = "function" == typeof e ? e : null,
                this.onRejected = "function" == typeof t ? t : null,
                this.promise = r
            }
            function f(e, t) {
                var r = !1;
                try {
                    e(function(e) {
                        r || (r = !0,
                        u(t, e))
                    }, function(e) {
                        r || (r = !0,
                        d(t, e))
                    })
                } catch (e) {
                    if (r)
                        return;
                    r = !0,
                    d(t, e)
                }
            }
            a.prototype.catch = function(e) {
                return this.then(null, e)
            }
            ,
            a.prototype.then = function(e, t) {
                var r = new this.constructor(o);
                return s(this, new l(e,t,r)),
                r
            }
            ,
            a.prototype.finally = function(t) {
                var r = this.constructor;
                return this.then(function(e) {
                    return r.resolve(t()).then(function() {
                        return e
                    })
                }, function(e) {
                    return r.resolve(t()).then(function() {
                        return r.reject(e)
                    })
                })
            }
            ,
            a.all = function(t) {
                return new a(function(i, o) {
                    if (!c(t))
                        return o(new TypeError("Promise.all accepts an array"));
                    var a = Array.prototype.slice.call(t);
                    if (0 === a.length)
                        return i([]);
                    var s = a.length;
                    for (var e = 0; e < a.length; e++)
                        !function t(r, e) {
                            try {
                                if (e && ("object" == typeof e || "function" == typeof e)) {
                                    var n = e.then;
                                    if ("function" == typeof n)
                                        return void n.call(e, function(e) {
                                            t(r, e)
                                        }, o)
                                }
                                a[r] = e,
                                0 == --s && i(a)
                            } catch (e) {
                                o(e)
                            }
                        }(e, a[e])
                }
                )
            }
            ,
            a.allSettled = function(r) {
                return new this(function(i, e) {
                    if (!r || void 0 === r.length)
                        return e(new TypeError(typeof r + " " + r + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
                    var o = Array.prototype.slice.call(r);
                    if (0 === o.length)
                        return i([]);
                    var a = o.length;
                    for (var t = 0; t < o.length; t++)
                        !function t(r, e) {
                            if (e && ("object" == typeof e || "function" == typeof e)) {
                                var n = e.then;
                                if ("function" == typeof n)
                                    return void n.call(e, function(e) {
                                        t(r, e)
                                    }, function(e) {
                                        o[r] = {
                                            status: "rejected",
                                            reason: e
                                        },
                                        0 == --a && i(o)
                                    })
                            }
                            o[r] = {
                                status: "fulfilled",
                                value: e
                            },
                            0 == --a && i(o)
                        }(t, o[t])
                }
                )
            }
            ,
            a.resolve = function(t) {
                return t && "object" == typeof t && t.constructor === a ? t : new a(function(e) {
                    e(t)
                }
                )
            }
            ,
            a.reject = function(r) {
                return new a(function(e, t) {
                    t(r)
                }
                )
            }
            ,
            a.race = function(i) {
                return new a(function(e, t) {
                    if (!c(i))
                        return t(new TypeError("Promise.race accepts an array"));
                    for (var r = 0, n = i.length; r < n; r++)
                        a.resolve(i[r]).then(e, t)
                }
                )
            }
            ,
            a._immediateFn = "function" == typeof i ? function(e) {
                i(e)
            }
            : function(e) {
                n(e, 0)
            }
            ,
            a._unhandledRejectionFn = function(e) {
                "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
            }
            ,
            t.exports = a
        }
        , {}],
        16: [function(e, t, r) {
            "use strict";
            var n = e("@braintree/browser-detection/is-ie")
              , e = e("@braintree/browser-detection/is-ie9");
            t.exports = {
                isIe: n,
                isIe9: e
            }
        }
        , {
            "@braintree/browser-detection/is-ie": 7,
            "@braintree/browser-detection/is-ie9": 8
        }],
        17: [function(e, t, r) {
            "use strict";
            var u = e("./constants").BRAINTREE_VERSION
              , n = e("./request/graphql")
              , i = e("./request")
              , o = e("../lib/is-verified-domain")
              , d = e("../lib/braintree-error")
              , p = e("../lib/convert-to-braintree-error")
              , a = e("./get-configuration").getConfiguration
              , s = e("../lib/create-authorization-data")
              , l = e("../lib/add-metadata")
              , f = e("../lib/promise")
              , c = e("@braintree/wrap-promise")
              , h = e("../lib/once")
              , y = e("../lib/deferred")
              , E = e("../lib/assign").assign
              , g = e("../lib/analytics")
              , I = e("./errors")
              , m = e("../lib/constants").VERSION
              , _ = e("../lib/constants").GRAPHQL_URLS
              , A = e("../lib/methods")
              , T = e("../lib/convert-methods-to-error")
              , N = e("../lib/assets")
              , R = e("../lib/constants").FRAUDNET_FNCLS
              , v = e("../lib/constants").FRAUDNET_SOURCE
              , C = e("../lib/constants").FRAUDNET_URL
              , b = {};
            function O(e) {
                var t, r;
                if (e = e || {},
                t = JSON.stringify(e),
                !(r = e.gatewayConfiguration))
                    throw new d(I.CLIENT_MISSING_GATEWAY_CONFIGURATION);
                ["assetsUrl", "clientApiUrl", "configUrl"].forEach(function(e) {
                    if (e in r && !o(r[e]))
                        throw new d({
                            type: I.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
                            code: I.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
                            message: e + " property is on an invalid domain."
                        })
                }),
                this.getConfiguration = function() {
                    return JSON.parse(t)
                }
                ,
                this._request = i,
                this._configuration = this.getConfiguration(),
                this._clientApiBaseUrl = r.clientApiUrl + "/v1/",
                r.graphQL && (this._graphQL = new n({
                    graphQL: r.graphQL
                }))
            }
            O.initialize = function(t) {
                var r, e, n = b[t.authorization];
                if (n)
                    return g.sendEvent(n, "custom.client.load.cached"),
                    n;
                try {
                    e = s(t.authorization)
                } catch (e) {
                    return f.reject(new d(I.CLIENT_INVALID_AUTHORIZATION))
                }
                return n = a(e).then(function(e) {
                    return t.debug && (e.isDebug = !0),
                    e.authorization = t.authorization,
                    r = new O(e)
                }),
                b[t.authorization] = n,
                g.sendEvent(n, "custom.client.load.initialized"),
                n.then(function(e) {
                    return g.sendEvent(r, "custom.client.load.succeeded"),
                    e
                }).catch(function(e) {
                    return delete b[t.authorization],
                    f.reject(e)
                })
            }
            ,
            O.clearCache = function() {
                b = {}
            }
            ,
            O.prototype._findOrCreateFraudnetJSON = function(e) {
                var t, r, n = document.querySelector('script[fncls="' + R + '"]');
                n || ((n = document.body.appendChild(document.createElement("script"))).type = "application/json",
                n.setAttribute("fncls", R)),
                r = this.getConfiguration(),
                t = {
                    rda_tenant: "bt_card",
                    mid: r.gatewayConfiguration.merchantId
                },
                (r = r.authorizationFingerprint) && r.split("&").forEach(function(e) {
                    e = e.split("=");
                    "customer_id" === e[0] && 1 < e.length && (t.cid = e[1])
                }),
                e = {
                    f: e.substr(0, 32),
                    fp: t,
                    bu: !1,
                    s: v
                },
                n.text = JSON.stringify(e)
            }
            ,
            O.prototype.request = function(s, r) {
                var c = this
                  , e = new f(function(n, i) {
                    var o, e, t, r, a = Boolean("payment_methods/credit_cards" === s.endpoint && c.getConfiguration().gatewayConfiguration.creditCards.collectDeviceData);
                    if ("graphQLApi" !== s.api && (s.method ? s.endpoint || (r = "options.endpoint") : r = "options.method"),
                    r)
                        throw new d({
                            type: I.CLIENT_OPTION_REQUIRED.type,
                            code: I.CLIENT_OPTION_REQUIRED.code,
                            message: r + " is required when making a request."
                        });
                    if (o = "api"in s ? s.api : "clientApi",
                    t = {
                        method: s.method,
                        graphQL: c._graphQL,
                        timeout: s.timeout,
                        metadata: c._configuration.analyticsMetadata
                    },
                    "clientApi" === o)
                        e = c._clientApiBaseUrl,
                        t.data = l(c._configuration, s.data);
                    else {
                        if ("graphQLApi" !== o)
                            throw new d({
                                type: I.CLIENT_OPTION_INVALID.type,
                                code: I.CLIENT_OPTION_INVALID.code,
                                message: "options.api is invalid."
                            });
                        e = _[c._configuration.gatewayConfiguration.environment],
                        s.endpoint = "",
                        t.method = "post",
                        t.data = E({
                            clientSdkMetadata: {
                                platform: c._configuration.analyticsMetadata.platform,
                                source: c._configuration.analyticsMetadata.source,
                                integration: c._configuration.analyticsMetadata.integration,
                                sessionId: c._configuration.analyticsMetadata.sessionId,
                                version: m
                            }
                        }, s.data),
                        t.headers = {
                            Authorization: "Bearer " + ((r = c._configuration).authorizationFingerprint || r.authorization),
                            "Braintree-Version": u
                        }
                    }
                    t.url = e + s.endpoint,
                    t.sendAnalyticsEvent = function(e) {
                        g.sendEvent(c, e)
                    }
                    ,
                    c._request(t, function(e, t, r) {
                        e = function(e, t) {
                            var r;
                            -1 === e ? r = new d(I.CLIENT_REQUEST_TIMEOUT) : 401 === e ? r = new d(I.CLIENT_AUTHORIZATION_INVALID) : 403 === e ? r = new d(I.CLIENT_AUTHORIZATION_INSUFFICIENT) : 429 === e ? r = new d(I.CLIENT_RATE_LIMITED) : 500 <= e ? r = new d(I.CLIENT_GATEWAY_NETWORK) : (e < 200 || 400 <= e) && (r = p(t, {
                                type: I.CLIENT_REQUEST_ERROR.type,
                                code: I.CLIENT_REQUEST_ERROR.code,
                                message: I.CLIENT_REQUEST_ERROR.message
                            }));
                            if (r)
                                return r.details = r.details || {},
                                r.details.httpStatus = e,
                                r
                        }(r, e);
                        e ? i(e) : "graphQLApi" === o && t.errors ? i(p(t.errors, {
                            type: I.CLIENT_GRAPHQL_REQUEST_ERROR.type,
                            code: I.CLIENT_GRAPHQL_REQUEST_ERROR.code,
                            message: I.CLIENT_GRAPHQL_REQUEST_ERROR.message
                        })) : (t = E({
                            _httpStatus: r
                        }, t),
                        a && t.creditCards && 0 < t.creditCards.length && (c._findOrCreateFraudnetJSON(t.creditCards[0].nonce),
                        N.loadScript({
                            src: C,
                            forceScriptReload: !0
                        })),
                        n(t))
                    })
                }
                );
                return "function" == typeof r ? (r = h(y(r)),
                void e.then(function(e) {
                    r(null, e, e._httpStatus)
                }).catch(function(e) {
                    var t = e && e.details && e.details.httpStatus;
                    r(e, null, t)
                })) : e
            }
            ,
            O.prototype.toJSON = function() {
                return this.getConfiguration()
            }
            ,
            O.prototype.getVersion = function() {
                return m
            }
            ,
            O.prototype.teardown = c(function() {
                return delete b[this.getConfiguration().authorization],
                T(this, A(O.prototype)),
                f.resolve()
            }),
            t.exports = O
        }
        , {
            "../lib/add-metadata": 38,
            "../lib/analytics": 39,
            "../lib/assets": 40,
            "../lib/assign": 41,
            "../lib/braintree-error": 42,
            "../lib/constants": 43,
            "../lib/convert-methods-to-error": 44,
            "../lib/convert-to-braintree-error": 45,
            "../lib/create-authorization-data": 46,
            "../lib/deferred": 47,
            "../lib/is-verified-domain": 51,
            "../lib/methods": 53,
            "../lib/once": 54,
            "../lib/promise": 55,
            "./constants": 18,
            "./errors": 19,
            "./get-configuration": 20,
            "./request": 32,
            "./request/graphql": 30,
            "@braintree/wrap-promise": 14
        }],
        18: [function(e, t, r) {
            "use strict";
            t.exports = {
                BRAINTREE_VERSION: "2018-05-10"
            }
        }
        , {}],
        19: [function(e, t, r) {
            "use strict";
            e = e("../lib/braintree-error");
            t.exports = {
                CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN: {
                    type: e.types.MERCHANT,
                    code: "CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN"
                },
                CLIENT_OPTION_REQUIRED: {
                    type: e.types.MERCHANT,
                    code: "CLIENT_OPTION_REQUIRED"
                },
                CLIENT_OPTION_INVALID: {
                    type: e.types.MERCHANT,
                    code: "CLIENT_OPTION_INVALID"
                },
                CLIENT_MISSING_GATEWAY_CONFIGURATION: {
                    type: e.types.INTERNAL,
                    code: "CLIENT_MISSING_GATEWAY_CONFIGURATION",
                    message: "Missing gatewayConfiguration."
                },
                CLIENT_INVALID_AUTHORIZATION: {
                    type: e.types.MERCHANT,
                    code: "CLIENT_INVALID_AUTHORIZATION",
                    message: "Authorization is invalid. Make sure your client token or tokenization key is valid."
                },
                CLIENT_GATEWAY_NETWORK: {
                    type: e.types.NETWORK,
                    code: "CLIENT_GATEWAY_NETWORK",
                    message: "Cannot contact the gateway at this time."
                },
                CLIENT_REQUEST_TIMEOUT: {
                    type: e.types.NETWORK,
                    code: "CLIENT_REQUEST_TIMEOUT",
                    message: "Request timed out waiting for a reply."
                },
                CLIENT_REQUEST_ERROR: {
                    type: e.types.NETWORK,
                    code: "CLIENT_REQUEST_ERROR",
                    message: "There was a problem with your request."
                },
                CLIENT_GRAPHQL_REQUEST_ERROR: {
                    type: e.types.NETWORK,
                    code: "CLIENT_GRAPHQL_REQUEST_ERROR",
                    message: "There was a problem with your request."
                },
                CLIENT_RATE_LIMITED: {
                    type: e.types.MERCHANT,
                    code: "CLIENT_RATE_LIMITED",
                    message: "You are being rate-limited; please try again in a few minutes."
                },
                CLIENT_AUTHORIZATION_INSUFFICIENT: {
                    type: e.types.MERCHANT,
                    code: "CLIENT_AUTHORIZATION_INSUFFICIENT",
                    message: "The authorization used has insufficient privileges."
                },
                CLIENT_AUTHORIZATION_INVALID: {
                    type: e.types.MERCHANT,
                    code: "CLIENT_AUTHORIZATION_INVALID",
                    message: "Either the client token has expired and a new one should be generated or the tokenization key has been deactivated or deleted."
                }
            }
        }
        , {
            "../lib/braintree-error": 42
        }],
        20: [function(e, t, r) {
            "use strict";
            var c = e("../lib/braintree-error")
              , n = e("../lib/promise")
              , i = e("@braintree/wrap-promise")
              , u = e("./request")
              , d = e("@braintree/uuid")
              , p = e("../lib/constants")
              , l = e("./errors")
              , f = e("./request/graphql")
              , h = e("../lib/constants").GRAPHQL_URLS
              , y = e("../lib/is-date-string-before-or-on")
              , E = e("./constants").BRAINTREE_VERSION;
            t.exports = {
                getConfiguration: i(function(t) {
                    return new n(function(n, i) {
                        var o, e = d(), a = {
                            merchantAppId: window.location.host,
                            platform: p.PLATFORM,
                            sdkVersion: p.VERSION,
                            source: p.SOURCE,
                            integration: p.INTEGRATION,
                            integrationType: p.INTEGRATION,
                            sessionId: e
                        }, s = t.attrs, e = t.configUrl;
                        s._meta = a,
                        s.braintreeLibraryVersion = p.BRAINTREE_LIBRARY_VERSION,
                        s.configVersion = "3",
                        e = {
                            url: e,
                            method: "GET",
                            data: s
                        },
                        s.authorizationFingerprint && t.graphQL ? (y(t.graphQL.date, E) && (e.graphQL = new f({
                            graphQL: {
                                url: t.graphQL.url,
                                features: ["configuration"]
                            }
                        })),
                        e.metadata = a) : s.tokenizationKey && (e.graphQL = new f({
                            graphQL: {
                                url: h[t.environment],
                                features: ["configuration"]
                            }
                        }),
                        e.metadata = a),
                        u(e, function(e, t, r) {
                            return e ? (r = 403 === r ? l.CLIENT_AUTHORIZATION_INSUFFICIENT : 401 === r ? l.CLIENT_AUTHORIZATION_INVALID : l.CLIENT_GATEWAY_NETWORK,
                            void i(new c({
                                type: r.type,
                                code: r.code,
                                message: r.message,
                                details: {
                                    originalError: e
                                }
                            }))) : (o = {
                                authorizationType: s.tokenizationKey ? "TOKENIZATION_KEY" : "CLIENT_TOKEN",
                                authorizationFingerprint: s.authorizationFingerprint,
                                analyticsMetadata: a,
                                gatewayConfiguration: t
                            },
                            void n(o))
                        })
                    }
                    )
                })
            }
        }
        , {
            "../lib/braintree-error": 42,
            "../lib/constants": 43,
            "../lib/is-date-string-before-or-on": 50,
            "../lib/promise": 55,
            "./constants": 18,
            "./errors": 19,
            "./request": 32,
            "./request/graphql": 30,
            "@braintree/uuid": 10,
            "@braintree/wrap-promise": 14
        }],
        21: [function(e, t, r) {
            "use strict";
            var n = e("../lib/braintree-error")
              , i = e("./client")
              , o = e("../lib/promise")
              , a = e("@braintree/wrap-promise")
              , s = e("../lib/errors");
            t.exports = {
                create: a(function(e) {
                    return e.authorization ? i.initialize(e) : o.reject(new n({
                        type: s.INSTANTIATION_OPTION_REQUIRED.type,
                        code: s.INSTANTIATION_OPTION_REQUIRED.code,
                        message: "options.authorization is required when instantiating a client."
                    }))
                }),
                VERSION: "3.85.2"
            }
        }
        , {
            "../lib/braintree-error": 42,
            "../lib/errors": 49,
            "../lib/promise": 55,
            "./client": 17,
            "@braintree/wrap-promise": 14
        }],
        22: [function(e, t, r) {
            "use strict";
            var y = e("../../lib/querystring")
              , E = e("../../lib/assign").assign
              , g = e("./prep-body")
              , I = e("./parse-body")
              , m = e("./xhr")
              , _ = m.isAvailable
              , A = e("./graphql/request")
              , T = e("./default-request")
              , N = 1
              , R = 408;
            function v(t, r, n) {
                var i, o, a, e, s, c, u = t.url, d = t.graphQL, p = t.timeout, l = m.getRequestObject(), f = n, h = Boolean(d && d.isGraphQLRequest(u, t.data));
                t.headers = E({
                    "Content-Type": "application/json"
                }, t.headers),
                u = (a = new (h ? A : T)(t)).getUrl(),
                e = a.getBody(),
                d = a.getMethod(),
                s = a.getHeaders(),
                "GET" === d && (u = y.queryify(u, e),
                e = null),
                _ ? l.onreadystatechange = function() {
                    if (4 === l.readyState) {
                        if (0 === l.status && h)
                            return delete t.graphQL,
                            void v(t, r, n);
                        if (c = I(l.responseText),
                        o = a.adaptResponseBody(c),
                        400 <= (i = a.determineStatus(l.status, c)) || i < 200) {
                            if (h && ("UNKNOWN" === (e = !(e = c).data && e.errors && e.errors[0] && e.errors[0].extensions && e.errors[0].extensions.errorClass) || "INTERNAL" === e))
                                return delete t.graphQL,
                                void v(t, r, n);
                            r < N && (!(e = i) || e === R) ? v(t, ++r, n) : f(o || "error", null, i || 500)
                        } else
                            f(null, o, i);
                        var e
                    }
                }
                : (t.headers && (u = y.queryify(u, s)),
                l.onload = function() {
                    f(null, I(l.responseText), l.status)
                }
                ,
                l.onerror = function() {
                    f("error", null, 500)
                }
                ,
                l.onprogress = function() {}
                ,
                l.ontimeout = function() {
                    f("timeout", null, -1)
                }
                );
                try {
                    l.open(d, u, !0)
                } catch (e) {
                    if (!h)
                        throw e;
                    return delete t.graphQL,
                    void v(t, r, n)
                }
                l.timeout = p,
                _ && Object.keys(s).forEach(function(e) {
                    l.setRequestHeader(e, s[e])
                });
                try {
                    l.send(g(d, e))
                } catch (e) {}
            }
            t.exports = {
                request: function(e, t) {
                    v(e, 0, t)
                }
            }
        }
        , {
            "../../lib/assign": 41,
            "../../lib/querystring": 56,
            "./default-request": 23,
            "./graphql/request": 31,
            "./parse-body": 35,
            "./prep-body": 36,
            "./xhr": 37
        }],
        23: [function(e, t, r) {
            "use strict";
            function n(e) {
                this._url = e.url,
                this._data = e.data,
                this._method = e.method,
                this._headers = e.headers
            }
            n.prototype.getUrl = function() {
                return this._url
            }
            ,
            n.prototype.getBody = function() {
                return this._data
            }
            ,
            n.prototype.getMethod = function() {
                return this._method
            }
            ,
            n.prototype.getHeaders = function() {
                return this._headers
            }
            ,
            n.prototype.adaptResponseBody = function(e) {
                return e
            }
            ,
            n.prototype.determineStatus = function(e) {
                return e
            }
            ,
            t.exports = n
        }
        , {}],
        24: [function(e, t, r) {
            "use strict";
            t.exports = function() {
                return window.navigator.userAgent
            }
        }
        , {}],
        25: [function(e, t, r) {
            "use strict";
            var n = e("./error")
              , i = e("../../../../lib/assign").assign
              , o = {
                creditCard: {
                    AMERICAN_EXPRESS: "American Express",
                    DISCOVER: "Discover",
                    INTERNATIONAL_MAESTRO: "Maestro",
                    JCB: "JCB",
                    MASTERCARD: "MasterCard",
                    SOLO: "Solo",
                    UK_MAESTRO: "UK Maestro",
                    UNION_PAY: "UnionPay",
                    VISA: "Visa",
                    ELO: "Elo",
                    HIPER: "Hiper",
                    HIPERCARD: "Hipercard"
                },
                applePayWeb: {
                    VISA: "visa",
                    MASTERCARD: "mastercard",
                    DISCOVER: "discover",
                    AMERICAN_EXPRESS: "amex",
                    INTERNATIONAL_MAESTRO: "maestro",
                    ELO: "elo"
                },
                visaCheckout: {
                    VISA: "Visa",
                    MASTERCARD: "MasterCard",
                    DISCOVER: "Discover",
                    AMERICAN_EXPRESS: "American Express"
                },
                googlePay: {
                    VISA: "visa",
                    MASTERCARD: "mastercard",
                    DISCOVER: "discover",
                    AMERICAN_EXPRESS: "amex",
                    INTERNATIONAL_MAESTRO: "maestro",
                    ELO: "elo"
                },
                masterpass: {
                    VISA: "visa",
                    MASTERCARD: "master",
                    DISCOVER: "discover",
                    AMERICAN_EXPRESS: "amex",
                    DINERS: "diners",
                    INTERNATIONAL_MAESTRO: "maestro",
                    JCB: "jcb"
                }
            };
            function a(e, r) {
                return e.reduce(function(e, t) {
                    return r.hasOwnProperty(t) ? e.concat(r[t]) : e
                }, [])
            }
            t.exports = function(e, t) {
                return e = e.data && !e.errors ? function(e, t) {
                    var r = e.data.clientConfiguration;
                    e = {
                        environment: r.environment.toLowerCase(),
                        clientApiUrl: r.clientApiUrl,
                        assetsUrl: r.assetsUrl,
                        analytics: {
                            url: r.analyticsUrl
                        },
                        merchantId: r.merchantId,
                        venmo: "off"
                    },
                    r.supportedFeatures && (e.graphQL = {
                        url: t._graphQL._config.url,
                        features: r.supportedFeatures.map(function(e) {
                            return e.toLowerCase()
                        })
                    });
                    r.braintreeApi && (e.braintreeApi = r.braintreeApi);
                    r.applePayWeb && (e.applePayWeb = r.applePayWeb,
                    e.applePayWeb.supportedNetworks = a(r.applePayWeb.supportedCardBrands, o.applePayWeb),
                    delete e.applePayWeb.supportedCardBrands);
                    r.ideal && (e.ideal = r.ideal);
                    r.kount && (e.kount = {
                        kountMerchantId: r.kount.merchantId
                    });
                    r.creditCard ? (e.challenges = r.creditCard.challenges.map(function(e) {
                        return e.toLowerCase()
                    }),
                    e.creditCards = {
                        supportedCardTypes: a(r.creditCard.supportedCardBrands, o.creditCard)
                    },
                    e.threeDSecureEnabled = r.creditCard.threeDSecureEnabled,
                    e.threeDSecure = r.creditCard.threeDSecure) : (e.challenges = [],
                    e.creditCards = {
                        supportedCardTypes: []
                    },
                    e.threeDSecureEnabled = !1);
                    r.googlePay && (e.androidPay = {
                        displayName: r.googlePay.displayName,
                        enabled: !0,
                        environment: r.googlePay.environment.toLowerCase(),
                        googleAuthorizationFingerprint: r.googlePay.googleAuthorization,
                        paypalClientId: r.googlePay.paypalClientId,
                        supportedNetworks: a(r.googlePay.supportedCardBrands, o.googlePay)
                    });
                    r.venmo && (e.payWithVenmo = {
                        merchantId: r.venmo.merchantId,
                        accessToken: r.venmo.accessToken,
                        environment: r.venmo.environment.toLowerCase()
                    });
                    r.paypal ? (e.paypalEnabled = !0,
                    e.paypal = i({}, r.paypal),
                    e.paypal.currencyIsoCode = e.paypal.currencyCode,
                    e.paypal.environment = e.paypal.environment.toLowerCase(),
                    delete e.paypal.currencyCode) : e.paypalEnabled = !1;
                    r.unionPay && (e.unionPay = {
                        enabled: !0,
                        merchantAccountId: r.unionPay.merchantAccountId
                    });
                    r.visaCheckout && (e.visaCheckout = {
                        apikey: r.visaCheckout.apiKey,
                        encryptionKey: r.visaCheckout.encryptionKey,
                        externalClientId: r.visaCheckout.externalClientId,
                        supportedCardTypes: a(r.visaCheckout.supportedCardBrands, o.visaCheckout)
                    });
                    r.masterpass && (e.masterpass = {
                        merchantCheckoutId: r.masterpass.merchantCheckoutId,
                        supportedNetworks: a(r.masterpass.supportedCardBrands, o.masterpass)
                    });
                    r.usBankAccount && (e.usBankAccount = {
                        routeId: r.usBankAccount.routeId,
                        plaid: {
                            publicKey: r.usBankAccount.plaidPublicKey
                        }
                    });
                    return e
                }(e, t) : n(e)
            }
        }
        , {
            "../../../../lib/assign": 41,
            "./error": 27
        }],
        26: [function(e, t, r) {
            "use strict";
            var n = e("./error")
              , i = {
                AMERICAN_EXPRESS: "American Express",
                DINERS: "Discover",
                DISCOVER: "Discover",
                ELO: "Elo",
                HIPER: "Hiper",
                HIPERCARD: "Hipercard",
                INTERNATIONAL_MAESTRO: "Maestro",
                JCB: "JCB",
                MASTERCARD: "MasterCard",
                UK_MAESTRO: "Maestro",
                UNION_PAY: "UnionPay",
                VISA: "Visa"
            }
              , o = {
                YES: "Yes",
                NO: "No",
                UNKNOWN: "Unknown"
            }
              , a = {
                PSDTWO: "psd2"
            };
            t.exports = function(e) {
                return e = (e.data && !e.errors ? function(e) {
                    var t = e.data.tokenizeCreditCard
                      , r = t.creditCard
                      , e = r.last4 ? r.last4.substr(2, 4) : ""
                      , n = r.binData;
                    n && (["commercial", "debit", "durbinRegulated", "healthcare", "payroll", "prepaid"].forEach(function(e) {
                        n[e] ? n[e] = o[n[e]] : n[e] = "Unknown"
                    }),
                    ["issuingBank", "countryOfIssuance", "productId"].forEach(function(e) {
                        n[e] || (n[e] = "Unknown")
                    }));
                    e = {
                        creditCards: [{
                            binData: n,
                            consumed: !1,
                            description: e ? "ending in " + e : "",
                            nonce: t.token,
                            details: {
                                cardholderName: r.cardholderName,
                                expirationMonth: r.expirationMonth,
                                expirationYear: r.expirationYear,
                                bin: r.bin || "",
                                cardType: i[r.brandCode] || "Unknown",
                                lastFour: r.last4 || "",
                                lastTwo: e
                            },
                            type: "CreditCard",
                            threeDSecureInfo: null
                        }]
                    },
                    t.authenticationInsight && (t = t.authenticationInsight.customerAuthenticationRegulationEnvironment,
                    e.creditCards[0].authenticationInsight = {
                        regulationEnvironment: a[t] || t.toLowerCase()
                    });
                    return e
                }
                : n)(e)
            }
        }
        , {
            "./error": 27
        }],
        27: [function(e, t, r) {
            "use strict";
            t.exports = function(e) {
                var t, r, n = e.errors && e.errors[0] && e.errors[0].extensions && e.errors[0].extensions.errorClass;
                return e = "VALIDATION" === n ? 0 !== (r = function(e) {
                    var t = [];
                    return e.forEach(function(e) {
                        e.extensions && e.extensions.inputPath && !function e(t, r, n) {
                            var i;
                            var o = r.extensions.legacyCode;
                            var a = t[0];
                            if (1 === t.length)
                                return void n.push({
                                    code: o,
                                    field: a,
                                    message: r.message
                                });
                            n.forEach(function(e) {
                                e.field === a && (i = e)
                            });
                            i || (i = {
                                field: a,
                                fieldErrors: []
                            },
                            n.push(i));
                            e(t.slice(1), r, i.fieldErrors)
                        }(e.extensions.inputPath.slice(1), e, t)
                    }),
                    t
                }((t = e).errors)).length ? {
                    error: {
                        message: function(e) {
                            e = e[0].field;
                            return {
                                creditCard: "Credit card is invalid"
                            }[e]
                        }(r)
                    },
                    fieldErrors: r
                } : {
                    error: {
                        message: t.errors[0].message
                    }
                } : n ? {
                    error: {
                        message: e.errors[0].message
                    },
                    fieldErrors: []
                } : {
                    error: {
                        message: "There was a problem serving your request"
                    },
                    fieldErrors: []
                }
            }
        }
        , {}],
        28: [function(e, t, r) {
            "use strict";
            t.exports = function() {
                return {
                    query: "query ClientConfiguration {   clientConfiguration {     analyticsUrl     environment     merchantId     assetsUrl     clientApiUrl     creditCard {       supportedCardBrands       challenges       threeDSecureEnabled       threeDSecure {         cardinalAuthenticationJWT       }     }     applePayWeb {       countryCode       currencyCode       merchantIdentifier       supportedCardBrands     }     googlePay {       displayName       supportedCardBrands       environment       googleAuthorization       paypalClientId     }     ideal {       routeId       assetsUrl     }     kount {       merchantId     }     masterpass {       merchantCheckoutId       supportedCardBrands     }     paypal {       displayName       clientId       privacyUrl       userAgreementUrl       assetsUrl       environment       environmentNoNetwork       unvettedMerchant       braintreeClientId       billingAgreementsEnabled       merchantAccountId       currencyCode       payeeEmail     }     unionPay {       merchantAccountId     }     usBankAccount {       routeId       plaidPublicKey     }     venmo {       merchantId       accessToken       environment     }     visaCheckout {       apiKey       externalClientId       supportedCardBrands     }     braintreeApi {       accessToken       url     }     supportedFeatures   } }",
                    operationName: "ClientConfiguration"
                }
            }
        }
        , {}],
        29: [function(e, t, r) {
            "use strict";
            var a = e("../../../../lib/assign").assign;
            function i(e, t) {
                var r = e.creditCard
                  , n = r && r.billingAddress
                  , i = r && r.expirationDate
                  , o = r && (r.expirationMonth || i && i.split("/")[0].trim())
                  , i = r && (r.expirationYear || i && i.split("/")[1].trim())
                  , r = {
                    input: {
                        creditCard: {
                            number: r && r.number,
                            expirationMonth: o,
                            expirationYear: i,
                            cvv: r && r.cvv,
                            cardholderName: r && r.cardholderName
                        },
                        options: {}
                    }
                };
                return t.hasAuthenticationInsight && (r.authenticationInsightInput = {
                    merchantAccountId: e.merchantAccountId
                }),
                n && (r.input.creditCard.billingAddress = n),
                r.input = function(e, t) {
                    var r;
                    e.creditCard && e.creditCard.options && "boolean" == typeof e.creditCard.options.validate ? r = e.creditCard.options.validate : e.authorizationFingerprint && e.tokenizationKey || e.authorizationFingerprint ? r = !0 : e.tokenizationKey && (r = !1);
                    "boolean" == typeof r && (t.options = a({
                        validate: r
                    }, t.options));
                    return t
                }(e, r.input),
                r
            }
            t.exports = function(e) {
                var t, r, n = {
                    hasAuthenticationInsight: Boolean(e.authenticationInsight && e.merchantAccountId)
                };
                return {
                    query: (r = (t = n).hasAuthenticationInsight,
                    t = "mutation TokenizeCreditCard($input: TokenizeCreditCardInput!",
                    r && (t += ", $authenticationInsightInput: AuthenticationInsightInput!"),
                    t += ") {   tokenizeCreditCard(input: $input) {     token     creditCard {       bin       brandCode       last4       cardholderName       expirationMonth      expirationYear      binData {         prepaid         healthcare         debit         durbinRegulated         commercial         payroll         issuingBank         countryOfIssuance         productId       }     } ",
                    r && (t += "    authenticationInsight(input: $authenticationInsightInput) {      customerAuthenticationRegulationEnvironment    }"),
                    t += "  } }"),
                    variables: i(e, n),
                    operationName: "TokenizeCreditCard"
                }
            }
        }
        , {
            "../../../../lib/assign": 41
        }],
        30: [function(e, t, r) {
            "use strict";
            var i = e("../../browser-detection")
              , o = {
                tokenize_credit_cards: "payment_methods/credit_cards",
                configuration: "configuration"
            }
              , a = ["creditCard.options.unionPayEnrollment"];
            function n(e) {
                this._config = e.graphQL
            }
            n.prototype.getGraphQLEndpoint = function() {
                return this._config.url
            }
            ,
            n.prototype.isGraphQLRequest = function(e, t) {
                var r, n = this.getClientApiPath(e);
                return !(!this._isGraphQLEnabled() || !n || i.isIe9()) && (e = this._config.features.some(function(e) {
                    return o[e] === n
                }),
                r = t,
                !a.some(function(e) {
                    return void 0 !== e.split(".").reduce(function(e, t) {
                        return e && e[t]
                    }, r)
                }) && e)
            }
            ,
            n.prototype.getClientApiPath = function(e) {
                var t, e = e.split("/client_api/v1/");
                return t = 1 < e.length ? e[1].split("?")[0] : t
            }
            ,
            n.prototype._isGraphQLEnabled = function() {
                return Boolean(this._config)
            }
            ,
            t.exports = n
        }
        , {
            "../../browser-detection": 16
        }],
        31: [function(e, t, r) {
            "use strict";
            var n = e("../../constants").BRAINTREE_VERSION
              , i = e("../../../lib/assign").assign
              , o = e("./generators/credit-card-tokenization")
              , a = e("./adapters/credit-card-tokenization")
              , s = e("./generators/configuration")
              , e = e("./adapters/configuration")
              , c = {
                "payment_methods/credit_cards": o,
                configuration: s
            }
              , u = {
                "payment_methods/credit_cards": a,
                configuration: e
            };
            function d(e) {
                var t = e.graphQL.getClientApiPath(e.url);
                this._graphQL = e.graphQL,
                this._data = e.data,
                this._method = e.method,
                this._headers = e.headers,
                this._clientSdkMetadata = {
                    source: e.metadata.source,
                    integration: e.metadata.integration,
                    sessionId: e.metadata.sessionId
                },
                this._sendAnalyticsEvent = e.sendAnalyticsEvent || Function.prototype,
                this._generator = c[t],
                this._adapter = u[t],
                this._sendAnalyticsEvent("graphql.init")
            }
            function p(e) {
                return -1 === e.indexOf("_") ? e : e.toLowerCase().replace(/(\_\w)/g, function(e) {
                    return e[1].toUpperCase()
                })
            }
            d.prototype.getUrl = function() {
                return this._graphQL.getGraphQLEndpoint()
            }
            ,
            d.prototype.getBody = function() {
                var e = function r(n) {
                    var i = {};
                    Object.keys(n).forEach(function(e) {
                        var t = p(e);
                        "object" == typeof n[e] ? i[t] = r(n[e]) : "number" == typeof n[e] ? i[t] = String(n[e]) : i[t] = n[e]
                    });
                    return i
                }(this._data)
                  , e = this._generator(e)
                  , e = i({
                    clientSdkMetadata: this._clientSdkMetadata
                }, e);
                return JSON.stringify(e)
            }
            ,
            d.prototype.getMethod = function() {
                return "POST"
            }
            ,
            d.prototype.getHeaders = function() {
                var e = this._data.authorizationFingerprint ? (this._sendAnalyticsEvent("graphql.authorization-fingerprint"),
                this._data.authorizationFingerprint) : (this._sendAnalyticsEvent("graphql.tokenization-key"),
                this._data.tokenizationKey);
                return i({}, this._headers, {
                    Authorization: "Bearer " + e,
                    "Braintree-Version": n
                })
            }
            ,
            d.prototype.adaptResponseBody = function(e) {
                return this._adapter(e, this)
            }
            ,
            d.prototype.determineStatus = function(e, t) {
                var r, n = 200 === e ? (r = t.errors && t.errors[0] && t.errors[0].extensions && t.errors[0].extensions.errorClass,
                t.data && !t.errors ? 200 : "VALIDATION" === r ? 422 : "AUTHORIZATION" === r ? 403 : "AUTHENTICATION" === r ? 401 : (n = t,
                !r && n.errors[0].message ? 403 : 500)) : e || 500;
                return this._sendAnalyticsEvent("graphql.status." + e),
                this._sendAnalyticsEvent("graphql.determinedStatus." + n),
                n
            }
            ,
            t.exports = d
        }
        , {
            "../../../lib/assign": 41,
            "../../constants": 18,
            "./adapters/configuration": 25,
            "./adapters/credit-card-tokenization": 26,
            "./generators/configuration": 28,
            "./generators/credit-card-tokenization": 29
        }],
        32: [function(e, t, r) {
            "use strict";
            var n, i = e("../../lib/once"), o = e("./jsonp-driver"), a = e("./ajax-driver"), s = e("./get-user-agent"), c = e("./is-http");
            t.exports = function(e, t) {
                t = i(t || Function.prototype),
                e.method = (e.method || "GET").toUpperCase(),
                e.timeout = null == e.timeout ? 6e4 : e.timeout,
                e.data = e.data || {},
                ((n = null == n ? !(c() && /MSIE\s(8|9)/.test(s())) : n) ? a : o).request(e, t)
            }
        }
        , {
            "../../lib/once": 54,
            "./ajax-driver": 22,
            "./get-user-agent": 24,
            "./is-http": 33,
            "./jsonp-driver": 34
        }],
        33: [function(e, t, r) {
            "use strict";
            t.exports = function() {
                return "http:" === window.location.protocol
            }
        }
        , {}],
        34: [function(e, t, r) {
            "use strict";
            var d, p = e("@braintree/uuid"), l = e("../../lib/querystring"), f = {};
            function h(t) {
                try {
                    delete window[t]
                } catch (e) {
                    window[t] = null
                }
            }
            function y(i, o, a) {
                window[a] = function(e) {
                    var t = e.status || 500
                      , r = null
                      , n = null;
                    delete e.status,
                    400 <= t || t < 200 ? r = e : n = e,
                    h(a),
                    (e = i) && e.parentNode && e.parentNode.removeChild(e),
                    clearTimeout(f[a]),
                    o(r, n, t)
                }
            }
            t.exports = {
                request: function(e, t) {
                    var r, n, i, o, a = "callback_json_" + p().replace(/-/g, ""), s = e.url, c = e.data, u = e.method, e = e.timeout, s = l.queryify(s, c);
                    s = s = l.queryify(s, {
                        _method: u,
                        callback: a
                    }),
                    r = a,
                    n = document.createElement("script"),
                    i = !1,
                    n.src = s,
                    n.async = !0,
                    n.onerror = function() {
                        window[r]({
                            message: "error",
                            status: 500
                        })
                    }
                    ,
                    n.onload = n.onreadystatechange = function() {
                        i || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (i = !0,
                        n.onload = n.onreadystatechange = null)
                    }
                    ,
                    y(s = n, t, a),
                    f[o = a] = setTimeout(function() {
                        f[o] = null,
                        window[o]({
                            error: "timeout",
                            status: -1
                        }),
                        window[o] = function() {
                            h(o)
                        }
                    }, e),
                    (d = d || document.getElementsByTagName("head")[0]).appendChild(s)
                }
            }
        }
        , {
            "../../lib/querystring": 56,
            "@braintree/uuid": 10
        }],
        35: [function(e, t, r) {
            "use strict";
            t.exports = function(e) {
                try {
                    e = JSON.parse(e)
                } catch (e) {}
                return e
            }
        }
        , {}],
        36: [function(e, t, r) {
            "use strict";
            t.exports = function(e, t) {
                if ("string" != typeof e)
                    throw new Error("Method must be a string");
                return t = "get" !== e.toLowerCase() && null != t ? "string" == typeof t ? t : JSON.stringify(t) : t
            }
        }
        , {}],
        37: [function(e, t, r) {
            "use strict";
            var n = "undefined" != typeof window && window.XMLHttpRequest && "withCredentials"in new window.XMLHttpRequest;
            t.exports = {
                isAvailable: n,
                getRequestObject: function() {
                    return new (n ? window.XMLHttpRequest : window.XDomainRequest)
                }
            }
        }
        , {}],
        38: [function(e, t, r) {
            "use strict";
            var o = e("./create-authorization-data")
              , a = e("./json-clone")
              , s = e("./constants");
            t.exports = function(e, t) {
                var r, n = t ? a(t) : {}, t = o(e.authorization).attrs, i = a(e.analyticsMetadata);
                for (r in n.braintreeLibraryVersion = s.BRAINTREE_LIBRARY_VERSION,
                n._meta)
                    n._meta.hasOwnProperty(r) && (i[r] = n._meta[r]);
                return n._meta = i,
                t.tokenizationKey ? n.tokenizationKey = t.tokenizationKey : n.authorizationFingerprint = t.authorizationFingerprint,
                n
            }
        }
        , {
            "./constants": 43,
            "./create-authorization-data": 46,
            "./json-clone": 52
        }],
        39: [function(e, t, r) {
            "use strict";
            var n = e("./promise")
              , s = e("./constants")
              , c = e("./add-metadata");
            t.exports = {
                sendEvent: function(e, i, o) {
                    var a = Date.now();
                    return n.resolve(e).then(function(e) {
                        var t = Date.now()
                          , r = e.getConfiguration()
                          , n = e._request
                          , e = r.gatewayConfiguration.analytics.url
                          , t = {
                            analytics: [{
                                kind: s.ANALYTICS_PREFIX + i,
                                isAsync: Math.floor(t / 1e3) !== Math.floor(a / 1e3),
                                timestamp: a
                            }]
                        };
                        n({
                            url: e,
                            method: "post",
                            data: c(r, t),
                            timeout: s.ANALYTICS_REQUEST_TIMEOUT_MS
                        }, o)
                    }).catch(function(e) {
                        o && o(e)
                    })
                }
            }
        }
        , {
            "./add-metadata": 38,
            "./constants": 43,
            "./promise": 55
        }],
        40: [function(e, t, r) {
            "use strict";
            e = e("@braintree/asset-loader/load-script");
            t.exports = {
                loadScript: e
            }
        }
        , {
            "@braintree/asset-loader/load-script": 3
        }],
        41: [function(e, t, r) {
            "use strict";
            var n = "function" == typeof Object.assign ? Object.assign : i;
            function i(e) {
                for (var t, r, n = 1; n < arguments.length; n++)
                    for (r in t = arguments[n])
                        t.hasOwnProperty(r) && (e[r] = t[r]);
                return e
            }
            t.exports = {
                assign: n,
                _assign: i
            }
        }
        , {}],
        42: [function(e, t, r) {
            "use strict";
            e = e("./enumerate");
            function n(e) {
                if (!n.types.hasOwnProperty(e.type))
                    throw new Error(e.type + " is not a valid type.");
                if (!e.code)
                    throw new Error("Error code required.");
                if (!e.message)
                    throw new Error("Error message required.");
                this.name = "BraintreeError",
                this.code = e.code,
                this.message = e.message,
                this.type = e.type,
                this.details = e.details
            }
            ((n.prototype = Object.create(Error.prototype)).constructor = n).types = e(["CUSTOMER", "MERCHANT", "NETWORK", "INTERNAL", "UNKNOWN"]),
            n.findRootError = function(e) {
                return e instanceof n && e.details && e.details.originalError ? n.findRootError(e.details.originalError) : e
            }
            ,
            t.exports = n
        }
        , {
            "./enumerate": 48
        }],
        43: [function(e, t, r) {
            "use strict";
            t.exports = {
                ANALYTICS_PREFIX: "web.",
                ANALYTICS_REQUEST_TIMEOUT_MS: 2e3,
                ASSETS_URLS: {
                    production: "https://assets.braintreegateway.com",
                    sandbox: "https://assets.braintreegateway.com"
                },
                CLIENT_API_URLS: {
                    production: "https://api.braintreegateway.com:443",
                    sandbox: "https://api.sandbox.braintreegateway.com:443"
                },
                FRAUDNET_SOURCE: "BRAINTREE_SIGNIN",
                FRAUDNET_FNCLS: "fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",
                FRAUDNET_URL: "https://c.paypal.com/da/r/fb.js",
                BUS_CONFIGURATION_REQUEST_EVENT: "BUS_CONFIGURATION_REQUEST",
                GRAPHQL_URLS: {
                    production: "https://payments.braintree-api.com/graphql",
                    sandbox: "https://payments.sandbox.braintree-api.com/graphql"
                },
                INTEGRATION_TIMEOUT_MS: 6e4,
                VERSION: "3.85.2",
                INTEGRATION: "custom",
                SOURCE: "client",
                PLATFORM: "web",
                BRAINTREE_LIBRARY_VERSION: "braintree/web/3.85.2"
            }
        }
        , {}],
        44: [function(e, t, r) {
            "use strict";
            var n = e("./braintree-error")
              , i = e("./errors");
            t.exports = function(t, e) {
                e.forEach(function(e) {
                    t[e] = function() {
                        throw new n({
                            type: i.METHOD_CALLED_AFTER_TEARDOWN.type,
                            code: i.METHOD_CALLED_AFTER_TEARDOWN.code,
                            message: e + " cannot be called after teardown."
                        })
                    }
                })
            }
        }
        , {
            "./braintree-error": 42,
            "./errors": 49
        }],
        45: [function(e, t, r) {
            "use strict";
            var n = e("./braintree-error");
            t.exports = function(e, t) {
                return e instanceof n ? e : new n({
                    type: t.type,
                    code: t.code,
                    message: t.message,
                    details: {
                        originalError: e
                    }
                })
            }
        }
        , {
            "./braintree-error": 42
        }],
        46: [function(e, t, r) {
            "use strict";
            var i = e("../lib/vendor/polyfill").atob
              , o = e("../lib/constants").CLIENT_API_URLS;
            t.exports = function(e) {
                var t, r, n = {
                    attrs: {},
                    configUrl: ""
                };
                return /^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e) ? (t = (r = (t = e).split("_"))[0],
                t = {
                    merchantId: r.slice(2).join("_"),
                    environment: t
                },
                n.environment = t.environment,
                n.attrs.tokenizationKey = e,
                n.configUrl = o[t.environment] + "/merchants/" + t.merchantId + "/client_api/v1/configuration") : (e = JSON.parse(i(e)),
                n.environment = e.environment,
                n.attrs.authorizationFingerprint = e.authorizationFingerprint,
                n.configUrl = e.configUrl,
                n.graphQL = e.graphQL),
                n
            }
        }
        , {
            "../lib/constants": 43,
            "../lib/vendor/polyfill": 57
        }],
        47: [function(e, t, r) {
            "use strict";
            t.exports = function(t) {
                return function() {
                    var e = arguments;
                    setTimeout(function() {
                        t.apply(null, e)
                    }, 1)
                }
            }
        }
        , {}],
        48: [function(e, t, r) {
            "use strict";
            t.exports = function(e, r) {
                return r = null == r ? "" : r,
                e.reduce(function(e, t) {
                    return e[t] = r + t,
                    e
                }, {})
            }
        }
        , {}],
        49: [function(e, t, r) {
            "use strict";
            e = e("./braintree-error");
            t.exports = {
                INVALID_USE_OF_INTERNAL_FUNCTION: {
                    type: e.types.INTERNAL,
                    code: "INVALID_USE_OF_INTERNAL_FUNCTION"
                },
                INSTANTIATION_OPTION_REQUIRED: {
                    type: e.types.MERCHANT,
                    code: "INSTANTIATION_OPTION_REQUIRED"
                },
                INCOMPATIBLE_VERSIONS: {
                    type: e.types.MERCHANT,
                    code: "INCOMPATIBLE_VERSIONS"
                },
                CLIENT_SCRIPT_FAILED_TO_LOAD: {
                    type: e.types.NETWORK,
                    code: "CLIENT_SCRIPT_FAILED_TO_LOAD",
                    message: "Braintree client script could not be loaded."
                },
                METHOD_CALLED_AFTER_TEARDOWN: {
                    type: e.types.MERCHANT,
                    code: "METHOD_CALLED_AFTER_TEARDOWN"
                }
            }
        }
        , {
            "./braintree-error": 42
        }],
        50: [function(e, t, r) {
            "use strict";
            function n(e) {
                e = e.split("-");
                return new Date(e[0],e[1],e[2])
            }
            t.exports = function(e, t) {
                return n(e) <= n(t)
            }
        }
        , {}],
        51: [function(e, t, r) {
            "use strict";
            var n, i = {
                "paypal.com": 1,
                "braintreepayments.com": 1,
                "braintreegateway.com": 1,
                "braintree-api.com": 1
            };
            t.exports = function(e) {
                return e = e.toLowerCase(),
                !!/^https:/.test(e) && ((n = n || document.createElement("a")).href = e,
                e = n.hostname.split(".").slice(-2).join("."),
                i.hasOwnProperty(e))
            }
        }
        , {}],
        52: [function(e, t, r) {
            "use strict";
            t.exports = function(e) {
                return JSON.parse(JSON.stringify(e))
            }
        }
        , {}],
        53: [function(e, t, r) {
            "use strict";
            t.exports = function(t) {
                return Object.keys(t).filter(function(e) {
                    return "function" == typeof t[e]
                })
            }
        }
        , {}],
        54: [function(e, t, r) {
            "use strict";
            t.exports = function(e) {
                var t = !1;
                return function() {
                    t || (t = !0,
                    e.apply(null, arguments))
                }
            }
        }
        , {}],
        55: [function(e, t, r) {
            "use strict";
            var n = e("promise-polyfill")
              , e = e("@braintree/extended-promise")
              , n = "undefined" != typeof Promise ? Promise : n;
            e.suppressUnhandledPromiseMessage = !0,
            e.setPromise(n),
            t.exports = n
        }
        , {
            "@braintree/extended-promise": 9,
            "promise-polyfill": 15
        }],
        56: [function(e, t, r) {
            "use strict";
            function n(e) {
                return e = e || window.location.href,
                /\?/.test(e)
            }
            function a(e, t) {
                var r, n, i, o = [];
                for (n in e)
                    e.hasOwnProperty(n) && (r = e[n],
                    i = t ? (i = e) && "object" == typeof i && "number" == typeof i.length && "[object Array]" === Object.prototype.toString.call(i) ? t + "[]" : t + "[" + n + "]" : n,
                    "object" == typeof r ? o.push(a(r, i)) : o.push(encodeURIComponent(i) + "=" + encodeURIComponent(r)));
                return o.join("&")
            }
            t.exports = {
                parse: function(e) {
                    return n(e = e || window.location.href) ? e.replace(/#.*$/, "").replace(/^.*\?/, "").split("&").reduce(function(e, t) {
                        var r = t.split("=")
                          , t = decodeURIComponent(r[0])
                          , r = decodeURIComponent(r[1]);
                        return e[t] = r,
                        e
                    }, {}) : {}
                },
                stringify: a,
                queryify: function(e, t) {
                    return e = e || "",
                    null != t && "object" == typeof t && function(e) {
                        for (var t in e)
                            if (e.hasOwnProperty(t))
                                return 1
                    }(t) && (e += -1 === e.indexOf("?") ? "?" : "",
                    e += -1 !== e.indexOf("=") ? "&" : "",
                    e += a(t)),
                    e
                },
                hasQueryParams: n
            }
        }
        , {}],
        57: [function(e, t, r) {
            "use strict";
            var n = "function" == typeof atob ? atob : i;
            function i(e) {
                var t, r, n, i, o, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", s = "";
                if (!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e))
                    throw new Error("Non base64 encoded input passed to window.atob polyfill");
                for (o = 0; r = a.indexOf(e.charAt(o++)),
                t = (15 & (n = a.indexOf(e.charAt(o++)))) << 4 | (i = a.indexOf(e.charAt(o++))) >> 2 & 15,
                i = (3 & i) << 6 | 63 & a.indexOf(e.charAt(o++)),
                s += String.fromCharCode((63 & r) << 2 | n >> 4 & 3) + (t ? String.fromCharCode(t) : "") + (i ? String.fromCharCode(i) : ""),
                o < e.length; )
                    ;
                return s
            }
            t.exports = {
                atob: function(e) {
                    return n.call(window, e)
                },
                _atob: i
            }
        }
        , {}]
    }, {}, [21])(21)
});