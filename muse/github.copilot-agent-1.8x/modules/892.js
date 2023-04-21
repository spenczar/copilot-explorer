Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.Type =
  exports.TypeBuilder =
  exports.Modifier =
  exports.Hint =
  exports.Kind =
    undefined;
exports.Kind = Symbol.for("TypeBox.Kind");
exports.Hint = Symbol.for("TypeBox.Hint");
exports.Modifier = Symbol.for("TypeBox.Modifier");
let r = 0;
class TypeBuilder {
  ReadonlyOptional(e) {
    return {
      [exports.Modifier]: "ReadonlyOptional",
      ...e,
    };
  }
  Readonly(e) {
    return {
      [exports.Modifier]: "Readonly",
      ...e,
    };
  }
  Optional(e) {
    return {
      [exports.Modifier]: "Optional",
      ...e,
    };
  }
  Any(e = {}) {
    return this.Create({
      ...e,
      [exports.Kind]: "Any",
    });
  }
  Array(e, r = {}) {
    return this.Create({
      ...r,
      [exports.Kind]: "Array",
      type: "array",
      items: e,
    });
  }
  Boolean(e = {}) {
    return this.Create({
      ...e,
      [exports.Kind]: "Boolean",
      type: "boolean",
    });
  }
  ConstructorParameters(e, t = {}) {
    return this.Tuple([...e.parameters], {
      ...t,
    });
  }
  Constructor(e, r, n = {}) {
    if ("Tuple" === e[exports.Kind]) {
      const i = undefined === e.items ? [] : e.items;
      return this.Create({
        ...n,
        [exports.Kind]: "Constructor",
        type: "object",
        instanceOf: "Constructor",
        parameters: i,
        returns: r,
      });
    }
    if (globalThis.Array.isArray(e))
      return this.Create({
        ...n,
        [exports.Kind]: "Constructor",
        type: "object",
        instanceOf: "Constructor",
        parameters: e,
        returns: r,
      });
    throw new Error("TypeBuilder.Constructor: Invalid parameters");
  }
  Date(e = {}) {
    return this.Create({
      ...e,
      [exports.Kind]: "Date",
      type: "object",
      instanceOf: "Date",
    });
  }
  Enum(e, r = {}) {
    const n = Object.keys(e)
      .filter((e) => isNaN(e))
      .map((t) => e[t])
      .map((e) =>
        "string" == typeof e
          ? {
              [exports.Kind]: "Literal",
              type: "string",
              const: e,
            }
          : {
              [exports.Kind]: "Literal",
              type: "number",
              const: e,
            }
      );
    return this.Create({
      ...r,
      [exports.Kind]: "Union",
      [exports.Hint]: "Enum",
      anyOf: n,
    });
  }
  Function(e, r, n = {}) {
    if ("Tuple" === e[exports.Kind]) {
      const i = undefined === e.items ? [] : e.items;
      return this.Create({
        ...n,
        [exports.Kind]: "Function",
        type: "object",
        instanceOf: "Function",
        parameters: i,
        returns: r,
      });
    }
    if (globalThis.Array.isArray(e))
      return this.Create({
        ...n,
        [exports.Kind]: "Function",
        type: "object",
        instanceOf: "Function",
        parameters: e,
        returns: r,
      });
    throw new Error("TypeBuilder.Function: Invalid parameters");
  }
  InstanceType(e, t = {}) {
    return {
      ...t,
      ...this.Clone(e.returns),
    };
  }
  Integer(e = {}) {
    return this.Create({
      ...e,
      [exports.Kind]: "Integer",
      type: "integer",
    });
  }
  Intersect(e, r = {}) {
    const n = (e) =>
      (e[exports.Modifier] && "Optional" === e[exports.Modifier]) ||
      "ReadonlyOptional" === e[exports.Modifier];
    const [i, o] = [new Set(), new Set()];
    for (const t of e)
      for (const [e, r] of Object.entries(t.properties))
        if (n(r)) {
          o.add(e);
        }
    for (const t of e)
      for (const e of Object.keys(t.properties))
        if (o.has(e)) {
          i.add(e);
        }
    const s = {};
    for (const r of e)
      for (const [e, n] of Object.entries(r.properties))
        s[e] =
          undefined === s[e]
            ? n
            : {
                [exports.Kind]: "Union",
                anyOf: [
                  s[e],
                  {
                    ...n,
                  },
                ],
              };
    return i.size > 0
      ? this.Create({
          ...r,
          [exports.Kind]: "Object",
          type: "object",
          properties: s,
          required: [...i],
        })
      : this.Create({
          ...r,
          [exports.Kind]: "Object",
          type: "object",
          properties: s,
        });
  }
  KeyOf(e, r = {}) {
    const n = Object.keys(e.properties).map((e) =>
      this.Create({
        ...r,
        [exports.Kind]: "Literal",
        type: "string",
        const: e,
      })
    );
    return this.Create({
      ...r,
      [exports.Kind]: "Union",
      [exports.Hint]: "KeyOf",
      anyOf: n,
    });
  }
  Literal(e, r = {}) {
    return this.Create({
      ...r,
      [exports.Kind]: "Literal",
      const: e,
      type: typeof e,
    });
  }
  Never(e = {}) {
    return this.Create({
      ...e,
      [exports.Kind]: "Never",
      allOf: [
        {
          type: "boolean",
          const: false,
        },
        {
          type: "boolean",
          const: true,
        },
      ],
    });
  }
  Null(e = {}) {
    return this.Create({
      ...e,
      [exports.Kind]: "Null",
      type: "null",
    });
  }
  Number(e = {}) {
    return this.Create({
      ...e,
      [exports.Kind]: "Number",
      type: "number",
    });
  }
  Object(e, r = {}) {
    const n = Object.keys(e);
    const i = n.filter((r) => {
      const n = e[r][exports.Modifier];
      return n && ("Optional" === n || "ReadonlyOptional" === n);
    });
    const o = n.filter((e) => !i.includes(e));
    return o.length > 0
      ? this.Create({
          ...r,
          [exports.Kind]: "Object",
          type: "object",
          properties: e,
          required: o,
        })
      : this.Create({
          ...r,
          [exports.Kind]: "Object",
          type: "object",
          properties: e,
        });
  }
  Omit(e, r, n = {}) {
    const i = "Union" === r[exports.Kind] ? r.anyOf.map((e) => e.const) : r;
    const o = {
      ...this.Clone(e),
      ...n,
      [exports.Hint]: "Omit",
    };
    if (o.required) {
      o.required = o.required.filter((e) => !i.includes(e));
      if (0 === o.required.length) {
        delete o.required;
      }
    }
    for (const e of Object.keys(o.properties))
      if (i.includes(e)) {
        delete o.properties[e];
      }
    return this.Create(o);
  }
  Parameters(e, r = {}) {
    return exports.Type.Tuple(e.parameters, {
      ...r,
    });
  }
  Partial(e, r = {}) {
    const n = {
      ...this.Clone(e),
      ...r,
      [exports.Hint]: "Partial",
    };
    delete n.required;
    for (const e of Object.keys(n.properties)) {
      const r = n.properties[e];
      switch (r[exports.Modifier]) {
        case "ReadonlyOptional":
        case "Readonly":
          r[exports.Modifier] = "ReadonlyOptional";
          break;
        default:
          r[exports.Modifier] = "Optional";
      }
    }
    return this.Create(n);
  }
  Pick(e, r, n = {}) {
    const i = "Union" === r[exports.Kind] ? r.anyOf.map((e) => e.const) : r;
    const o = {
      ...this.Clone(e),
      ...n,
      [exports.Hint]: "Pick",
    };
    if (o.required) {
      o.required = o.required.filter((e) => i.includes(e));
      if (0 === o.required.length) {
        delete o.required;
      }
    }
    for (const e of Object.keys(o.properties))
      if (i.includes(e)) {
        delete o.properties[e];
      }
    return this.Create(o);
  }
  Promise(e, r = {}) {
    return this.Create({
      ...r,
      [exports.Kind]: "Promise",
      type: "object",
      instanceOf: "Promise",
      item: e,
    });
  }
  Record(e, r, n = {}) {
    if ("Union" === e[exports.Kind])
      return this.Object(
        e.anyOf.reduce(
          (e, t) => ({
            ...e,
            [t.const]: r,
          }),
          {}
        ),
        {
          ...n,
          [exports.Hint]: "Record",
        }
      );
    const i = ["Integer", "Number"].includes(e[exports.Kind])
      ? "^(0|[1-9][0-9]*)$"
      : "String" === e[exports.Kind] && e.pattern
      ? e.pattern
      : "^.*$";
    return this.Create({
      ...n,
      [exports.Kind]: "Record",
      type: "object",
      patternProperties: {
        [i]: r,
      },
      additionalProperties: false,
    });
  }
  Recursive(e, n = {}) {
    if (undefined === n.$id) {
      n.$id = "T" + r++;
    }
    const i = e({
      [exports.Kind]: "Self",
      $ref: `${n.$id}`,
    });
    i.$id = n.$id;
    return this.Create({
      ...n,
      ...i,
    });
  }
  Ref(e, r = {}) {
    if (undefined === e.$id)
      throw Error("TypeBuilder.Ref: Referenced schema must specify an $id");
    return this.Create({
      ...r,
      [exports.Kind]: "Ref",
      $ref: e.$id,
    });
  }
  RegEx(e, r = {}) {
    return this.Create({
      ...r,
      [exports.Kind]: "String",
      type: "string",
      pattern: e.source,
    });
  }
  Required(e, r = {}) {
    const n = {
      ...this.Clone(e),
      ...r,
      [exports.Hint]: "Required",
    };
    n.required = Object.keys(n.properties);
    for (const e of Object.keys(n.properties)) {
      const r = n.properties[e];
      switch (r[exports.Modifier]) {
        case "ReadonlyOptional":
        case "Readonly":
          r[exports.Modifier] = "Readonly";
          break;
        default:
          delete r[exports.Modifier];
      }
    }
    return this.Create(n);
  }
  ReturnType(e, t = {}) {
    return {
      ...t,
      ...this.Clone(e.returns),
    };
  }
  Strict(e) {
    return JSON.parse(JSON.stringify(e));
  }
  String(e = {}) {
    return this.Create({
      ...e,
      [exports.Kind]: "String",
      type: "string",
    });
  }
  Tuple(e, r = {}) {
    const n = e.length;
    const i = e.length;
    const o =
      e.length > 0
        ? {
            ...r,
            [exports.Kind]: "Tuple",
            type: "array",
            items: e,
            additionalItems: false,
            minItems: n,
            maxItems: i,
          }
        : {
            ...r,
            [exports.Kind]: "Tuple",
            type: "array",
            minItems: n,
            maxItems: i,
          };
    return this.Create(o);
  }
  Undefined(e = {}) {
    return this.Create({
      ...e,
      [exports.Kind]: "Undefined",
      type: "null",
      typeOf: "Undefined",
    });
  }
  Union(e, r = {}) {
    return 0 === e.length
      ? exports.Type.Never({
          ...r,
        })
      : this.Create({
          ...r,
          [exports.Kind]: "Union",
          anyOf: e,
        });
  }
  Uint8Array(e = {}) {
    return this.Create({
      ...e,
      [exports.Kind]: "Uint8Array",
      type: "object",
      instanceOf: "Uint8Array",
    });
  }
  Unknown(e = {}) {
    return this.Create({
      ...e,
      [exports.Kind]: "Unknown",
    });
  }
  Unsafe(e = {}) {
    return this.Create({
      ...e,
      [exports.Kind]: e[exports.Kind] || "Unsafe",
    });
  }
  Void(e = {}) {
    return this.Create({
      ...e,
      [exports.Kind]: "Void",
      type: "null",
      typeOf: "Void",
    });
  }
  Create(e) {
    return e;
  }
  Clone(e) {
    return "object" != typeof (t = e) || null === t || Array.isArray(t)
      ? ((e) => "object" == typeof e && null !== e && Array.isArray(e))(e)
        ? e.map((e) => this.Clone(e))
        : e
      : Object.keys(e).reduce(
          (t, r) => ({
            ...t,
            [r]: this.Clone(e[r]),
          }),
          Object.getOwnPropertySymbols(e).reduce(
            (t, r) => ({
              ...t,
              [r]: this.Clone(e[r]),
            }),
            {}
          )
        );
    var t;
  }
}
exports.TypeBuilder = TypeBuilder;
exports.Type = new TypeBuilder();