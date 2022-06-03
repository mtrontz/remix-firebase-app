interface ExConcatArray<T> extends ConcatArray<T> {
  push: ((...items: T[]) => number)
}
interface AppFunctionProps {
  [key: string]: string
} 
type AppFunctionReturn = ReturnType<AppFunctionCallback>
type AppFunctionCallback = () => void;
type AppFunction<AppFunctionProps, AppFunctionCallback> = (args: AppFunctionProps, callback: AppFunctionCallback) => AppFunctionReturn;
type Is_UnFinished<T> = boolean extends (T extends never ? true : false) ? true : false
interface ParseConfig {}
type IParser<C extends ParseConfig> = (fileName: string, config: C) => any;
