type TClassMethod<TThis extends object, TArgs extends ReadonlyArray<unknown>, TReturn extends unknown> = (this: TThis, ...args: TArgs) => TReturn;

function TestDecorator<TThis extends object, TArgs extends ReadonlyArray<unknown>, TReturn extends unknown>(
  target: TClassMethod<TThis, TArgs, TReturn>,
  context: ClassMethodDecoratorContext<TThis, TClassMethod<TThis, TArgs, TReturn>>
) {
  return function(this: TThis, ...args: TArgs) {
    console.log('Works fine');
    (this as any).executed = true;
    target.call(this);
  }
}

class Test {
  @TestDecorator
  method(...args: ReadonlyArray<unknown>) {}
}

const test = new Test();

test.method();

if (!(test as any).executed) {
  console.log('Not working');
}
