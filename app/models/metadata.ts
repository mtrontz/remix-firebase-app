import { User } from './user';
import type {  } from './user';
import React, {useCallback, useState, useContext, useEffect, useMemo, useReducer, useLayoutEffect, useRef, createContext, createElement, createFactory, createRef } from "react";
// React Event Handlers
import type { 
  ClipboardEventHandler, FormEventHandler, EventHandler, MouseEventHandler, 
  KeyboardEventHandler, AnimationEventHandler, TransitionEventHandler, 
  CompositionEventHandler, PointerEventHandler, ChangeEventHandler, DragEventHandler, 
  FocusEventHandler, ReactEventHandler, TouchEventHandler, WheelEventHandler 
} from "react";
// React Events
import type { 
  ClipboardEvent, FormEvent, MouseEvent, 
  KeyboardEvent, AnimationEvent, TransitionEvent, 
  CompositionEvent, PointerEvent, ChangeEvent, DragEvent, 
  FocusEvent, TouchEvent, WheelEvent, InvalidEvent, SyntheticEvent, BaseSyntheticEvent
} from "react";
// React Elements
import type { 
  ElementRef, ElementType, ReactElement, 
  cloneElement, ClassicElement, 
  isValidElement, ComponentElement, ReactComponentElement, FunctionComponentElement, 
} from "react";
// React Components
import type { 
  Component, ComponentClass, ComponentFactory, ComponentLifecycle, ComponentProps, ComponentPropsWithRef,
  ComponentPropsWithoutRef, ComponentRef, ComponentSpec, ComponentState, ComponentType,
  PureComponent, ExoticComponent, ClassicComponent, FunctionComponent, FunctionComponentFactory,
  ClassicComponentClass, LazyExoticComponent, MemoExoticComponent, NamedExoticComponent, VoidFunctionComponent, ProviderExoticComponent,
  ForwardRefExoticComponent, StatelessComponent, RefForwardingComponent
} from "react";
// React Hooks
import type { 
  Dispatch, DispatchWithoutAction, SetStateAction, Reducer, 
  ReducerWithoutAction, ReducerState, ReducerAction, 
  ReducerStateWithoutAction, DependencyList, EffectCallback, 
  MutableRefObject
} from "react";

export class Metadata {
  public __name: string;
  public _createdOn: string = new Date(Date.now()).toDateString();
  public _lastUpdated: ReturnType<() => string> = new Date(Date.now()).toDateString();
  public _instance: Metadata = new Metadata(this._name, {"name": this._name});
  public _data: {[key: string]: string} | null;
    constructor(
      public _name: string,
      public data?: {[key: string]: string} | null,
      // private preferences?: PreferenceType | null
      ) {
      this._data = data || null;
      this.__name = _name;
  }

  getDisplayName(): string {
      console.log(this._instance.name);
      return this._instance.name
  }

  get name(): string {
      return this.__name;
  }

  set name(value: string) {
      this.__name = value;
  }

  get createdOn(): string {
      return this._createdOn;
  }

  set createdOn(value: string) {
      this._createdOn = value;
  }

  get lastUpdated(): string {
    return this._lastUpdated;
  }

  set lastUpdated(value: string) {
    this._lastUpdated = value;
  }

  get instance(): Metadata {
    return this._instance;
  }

  set instance(value: Metadata) {
    this._instance = value;
  }
}
export type {Metadata as MetadataType} 
/**
   * Creates a new BaseUser.
   * @param {string} email for the user
   * @param {string} role role for the user
   * @param {string} id unique id for the user
   * @param {PreferenceType} preferences any user preferences
   */
//  constructor(
//   private email: string = '',
//   private role: string = '',
//   private id: string = '',
//   private preferences?: PreferenceType | null
// ) {
//   this.preferences = preferences || null;
// }

/**
 * Get email
 * @returns {string} the email
 */
// getEmail(): string {
//   return this.email;
// }

/**
 * Set email
 * @param {string} email the new email
 */
// setEmail(email: string): void {
//   this.email = email;
// }

/**
 * Get user roles
 * @returns {string} the user role
 */
// getRole(): string {
//   return this.role;
// }

/**
 * Set user role
 * @param {string} role the new user role
 */
// setRole(role: string): void {
//   this.role = role;
// }
// 
// /**
//  * Get user id
//  * @returns {string} the unique user id
//  */
// getId(): string {
//   return this.id;
// }
// 
// /**
//  * Set user id
//  * @param {string} id unique id for the user
//  */
// setId(id: string): void {
//   this.id = id;
// }
// 
// /**
//  * Get user preferences
//  * @returns {PreferenceType} a shallow copy of the user preferences
//  */
// getPreferences(): PreferenceType {
//   return { ...this.preferences };
// }
// 
// /**
//  * Set user preferences
//  * @param {PreferenceType} prefs preferences for the user
//  */
// setPreferences(prefs: PreferenceType): void {
//   this.preferences = prefs;
// }
// }
// 
// let person: Person = new Person("Ashlee", 23);
// person.displayAsString();
// let pName: string = person.name; //calling getter
// console.log(pName);
// person.age = 25;//calling setter
// person.displayAsString();