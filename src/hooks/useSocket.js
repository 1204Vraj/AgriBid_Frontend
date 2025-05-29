"use client"

import { useEffect, useRef } from "react"
import { Client } from "@stomp/stompjs"
import SockJS from "sockjs-client"

export function useSocket(topic, onMessage) {
  const clientRef = useRef(null)

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws") // backend endpoint
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: str => console.log("STOMP:", str),
      onConnect: () => {
        console.log("✅ Connected to WebSocket")
        if (topic && onMessage) {
          client.subscribe(topic, message => {
            onMessage(JSON.parse(message.body))
          })
        }
      },
      onStompError: frame => {
        console.error("❌ Broker reported error:", frame)
      },
    })

    client.activate()
    clientRef.current = client

    return () => {
      if (clientRef.current && clientRef.current.active) {
        clientRef.current.deactivate()
      }
    }
  }, [topic, onMessage])

  return clientRef.current
}
