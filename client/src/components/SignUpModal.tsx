import { useState } from "react"
import { Alert, Button, Form, Modal } from "react-bootstrap"
import {useForm} from "react-hook-form"
import { ConflictError } from "../errors/httpErrors"
import { User } from "../models/user"
import * as UserApi from "../network/users_api"
import { SignupCredentials } from "../network/users_api"
import styleUtils from "../styles/utils.module.css"
import TextInputField from "./form/TextInputField"

interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSuccessful: (user: User) => void,
}

const SignUpModal = ({onDismiss, onSignUpSuccessful}: SignUpModalProps) => {
    
    const [errorText, setErrorText] = useState<string|null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupCredentials>()

    async function onSubmit(credentials: SignupCredentials) {
        try {
            const newUser = await UserApi.signUp(credentials)
            onSignUpSuccessful(newUser)
        } catch (error) {
            if (error instanceof ConflictError) {
                setErrorText(error.message)
            } else {
                alert(error)
            }
            console.error(error)
        }
    }
    
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Sign Up
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {errorText &&
                <Alert variant="danger">
                    {errorText}
                </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField 
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.username}
                    />

                    <TextInputField 
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.email}
                    />

                    <TextInputField 
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.password}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}
                    >
                        Sign Up
                    </Button>
                </Form>
            </Modal.Body>

        </Modal>
    )
}

export default SignUpModal