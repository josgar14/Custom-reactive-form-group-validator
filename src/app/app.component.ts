import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

function ssnValidator(control: FormControl): { [key: string]: any } {
	const value: string = control.value || '';
	const valid = value.match(/^\d{9}$/);
	return valid ? null : { ssn: true };
}

function equalValidator({ value }: FormGroup): { [key: string]: any } {
	const [ first, ...rest ] = Object.keys(value || {});
	const valid = rest.every((v) => value[v] === value[first]);
	return valid ? null : { equal: true };
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	formModel: FormGroup;

	constructor(fb: FormBuilder) {
		this.formModel = fb.group({
			userName: [ '', Validators.required ],
			socialSecurity: [ '', ssnValidator ],
			passwordsGroup: fb.group(
				{
					password: [ '', Validators.minLength(5) ],
					pconfirm: [ '' ]
				},
				{ validator: equalValidator }
			)
		});
	}

	onSubmit() {
		console.log(this.formModel.value);
	}
}
