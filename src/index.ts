/**
 * Standard links:
 * {@link Foo} or {@linkplain Foo} or [[Foo]]
 *
 * Code links: (Puts Foo inside <code> tags)
 * {@linkcode Foo} or [[`Foo`]]
 */
export class Bar implements Foo {
    member = true;
}

/** More details */
interface Foo {
    member: boolean;
}
