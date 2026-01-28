export interface MqttConfig {
  brokerHost: string // Hostname or IP address of the MQTT broker
  brokerPort: number // Port number of the MQTT broker
  topic: string // Base topic for the MQTT messages
}
