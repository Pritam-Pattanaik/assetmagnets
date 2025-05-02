import 'framer-motion';
import { HTMLMotionProps as OriginalHTMLMotionProps } from 'framer-motion';
import React from 'react';

declare module 'framer-motion' {
    export interface HTMLMotionProps<T extends keyof HTMLElementTagNameMap> extends OriginalHTMLMotionProps<T> {
        className?: string;
        children?: React.ReactNode;
    }
}