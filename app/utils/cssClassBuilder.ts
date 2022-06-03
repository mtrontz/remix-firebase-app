import { createCookieSessionStorage } from 'remix';
import {encrypt, decrypt, randomUUID, randomInt} from "~/services/encryption.server";
import React, { useCallback } from "react";

class CssClassBuilder {
  private classes: string[] = [];
  private instance: CssClassBuilder = new CssClassBuilder();

  public isEmpty(): boolean {
    return this.instance.classes.toString() === "";
  }
  public append(value: string, condition: boolean = true): CssClassBuilder {
    if (!!value && condition === true) {
      if (typeof value === "string") {
        value = value.trim();
        this.classes.push(value);
      }
      this.classes.push(value);
    }
    return this;
  }
  public toString(): string {
    return this.instance.classes.join(" ");
  }
};

export default CssClassBuilder;
export {};