"use client";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import CardWrapper from "./CardWrapper";
import { newVerification } from "@/actions/new-verification";
import FormSuccess from "../form-success";
import FormError from "../form-error";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Missing token!");
            return;
        }

        newVerification(token)
            .then((data) => {
                if (data.success) {
                    setSuccess(data.success);
                } else {
                    setError(data.error || "Something went wrong!");
                }
            })
            .catch(() => {
                setError("Something went wrong!");
            })
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader />
                )}
                {success ? <FormSuccess message={success} /> : (<FormError message={error} />)

                }
            </div>
        </CardWrapper>
    )
}