import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-error-404',
    templateUrl: './error-404.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink],
})
export class Error404Component {
    constructor() {}
}
