import {Suspense, useEffect} from "react";
import {I18nextProvider} from "react-i18next";
import i18n from "shared/i18n/i18n";
import {Args, ReactRenderer} from "@storybook/react";
import {Simplify} from "type-fest";
import {DecoratorFunction} from '@storybook/types'

export const withTranslation: DecoratorFunction<ReactRenderer, Simplify<Args>> = (Story, {globals: {locale}}) => {

    useEffect(() => {
        i18n.changeLanguage(locale)
    },[locale])

    return <Suspense fallback={<div>Loading...</div>}>
        <I18nextProvider i18n={i18n}>
            <Story/>
        </I18nextProvider>
    </Suspense>
}