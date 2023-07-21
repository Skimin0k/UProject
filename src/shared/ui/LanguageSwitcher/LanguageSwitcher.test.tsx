import {render} from '@testing-library/react'
import LanguageSwitcher from 'shared/ui/LanguageSwitcher/LanguageSwitcher'
import {withTranslation} from 'shared/lib/tests/withTranslation/withTranslation'

describe('LanguageSwitcher tests', () => {
    it('render ru translation', () => {
        render(withTranslation(<LanguageSwitcher/>))
    })
})