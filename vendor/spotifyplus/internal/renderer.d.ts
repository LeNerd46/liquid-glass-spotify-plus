import React from 'react';
export type MeasureCallback = (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => void;
export type MeasureInWindowCallback = (x: number, y: number, width: number, height: number) => void;
export type ScrollToOptions = {
    x?: number;
    y?: number;
    animated?: boolean;
};
export type ScrollToEndOptions = {
    animated?: boolean;
};
export type ScrollToIndexOptions = {
    index: number;
    animated?: boolean;
    viewOffset?: number;
    viewPosition?: number;
};
export type ScrollToOffsetOptions = {
    offset: number;
    animated?: boolean;
};
export interface NativeComponentRef {
    readonly nodeId: number;
    readonly type: string;
    readonly mounted: boolean;
    getNativeNodeId(): number;
    setNativeProps(props: Record<string, any>): void;
    focus(): void;
    blur(): void;
    measure(callback: MeasureCallback): void;
    measureInWindow(callback: MeasureInWindowCallback): void;
    scrollTo(options?: ScrollToOptions | number, y?: number, animated?: boolean): void;
    scrollToEnd(options?: ScrollToEndOptions): void;
    flashScrollIndicators(): void;
    dispatchCommand(command: string, args?: Record<string, any>, callback?: (payload: any) => void): void;
    command(command: string, args?: Record<string, any>, callback?: (payload: any) => void): void;
}
export declare function dispatchReactEvent(eventId: number, payload?: any): void;
export type MutationOp = {
    op: 'registerAsset';
    assetId: string;
    scriptId: string;
    generation: number;
    rootPath: string;
    manifestPath: string;
    filePath: string;
    mimeType: string;
    kind: string;
} | {
    op: 'createNode';
    id: number;
    type: string;
    props: Record<string, any>;
} | {
    op: 'createText';
    id: number;
    text: string;
} | {
    op: 'appendChild';
    parentId: number;
    childId: number;
} | {
    op: 'appendToRoot';
    childId: number;
} | {
    op: 'insertBefore';
    parentId: number;
    childId: number;
    beforeChildId: number;
} | {
    op: 'insertInRootBefore';
    childId: number;
    beforeChildId: number;
} | {
    op: 'removeChild';
    parentId: number;
    childId: number;
} | {
    op: 'removeFromRoot';
    childId: number;
} | {
    op: 'updateProps';
    id: number;
    props: Record<string, any>;
} | {
    op: 'updateText';
    id: number;
    text: string;
} | {
    op: 'setAnimatedProps';
    nodeId: number;
    props: Record<string, any>;
} | {
    op: 'removeAnimatedProps';
    nodeId: number;
} | {
    op: 'clearWorkletProps';
    nodeId: number;
} | {
    op: 'updateAnimatedValue';
    valueId: number;
    value: any;
    animation?: Record<string, any>;
} | {
    op: 'cancelAnimatedValue';
    valueId: number;
} | {
    op: 'updateSharedValue';
    valueId: number;
    value: any;
    animation?: Record<string, any>;
} | {
    op: 'startNativeAnimation';
    nodeId: number;
    animationId: number;
    type?: string;
    duration?: number;
    delay?: number;
    easing?: string;
    tracks: Array<{
        property: string;
        from: number;
        to: number;
    }>;
} | {
    op: 'stopNativeAnimation';
    animationId: number;
} | {
    op: 'scriptViewCommand';
    nodeId: number;
    command: string;
    args?: Record<string, any>;
} | {
    op: 'destroyNode';
    id: number;
} | {
    op: 'viewCommand';
    nodeId: number;
    command: string;
    args?: Record<string, any>;
    eventId?: number;
};
type CommitDispatcher = (surfaceId: string, ops: MutationOp[]) => void;
export declare function setCommitDispatcher(dispatcher: CommitDispatcher | null): void;
type CommitListener = (ops: MutationOp[], tree: any | null) => void;
export declare function setCommitListener(surfaceId: string, listener: CommitListener): void;
export declare function clearCommitListener(surfaceId: string): void;
export declare function dispatchSurfaceOps(surfaceId: string, ops: MutationOp[]): void;
export declare function getNodeSurfaceId(nodeId: number): string | undefined;
export declare function dispatchViewCommand(nodeId: number, command: string, args?: Record<string, any>, callback?: (payload: any) => void): void;
export declare function updateNodeProps(nodeId: number, props: Record<string, any>): void;
export declare function setAnimatedProps(nodeId: number, props: Record<string, any>): void;
export declare function removeAnimatedProps(nodeId: number): void;
export declare function clearWorkletProps(nodeId: number): void;
export declare function updateAnimatedValue(valueId: number, value: any, animation?: Record<string, any>): void;
export declare function cancelAnimatedValue(valueId: number): void;
export declare function updateSharedValue(valueId: number, value: any, animation?: Record<string, any>): void;
export declare function startNativeAnimation(nodeId: number, config: {
    animationId: number;
    type?: string;
    duration?: number;
    delay?: number;
    easing?: string;
    tracks: Array<{
        property: string;
        from: number;
        to: number;
    }>;
}): void;
export declare function stopNativeAnimation(animationId: number): void;
export declare function dispatchScriptViewCommand(nodeId: number, command: string, args?: Record<string, any>): void;
export interface RenderRoot {
    render(element: React.ReactNode): void;
    unmount(): void;
    getTree(): any;
}
export declare function createRoot(surfaceId: string): RenderRoot;
export {};
