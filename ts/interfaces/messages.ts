import { PayloadAction } from "@reduxjs/toolkit";
import React from "react";

export interface Message{
    id: Number;
    text: string;
    level: string;
}

export interface MessageItemProps {
    message: Message;
    messageIndex: number;
}

export interface MessageState {
    messages: Message[];
}
