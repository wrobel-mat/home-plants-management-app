package com.wrobelmat.homejungle.config;

import com.wrobelmat.homejungle.email.EmailReceiver;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.backoff.ExponentialBackOff;

@Configuration
public class RabbitMQConfig {

    public static final String topicExchangeName = "home-jungle-email-exchange";
    private static final String emailQueue = "home-jungle-email";

    @Bean
    Queue queue() {
        return new Queue(emailQueue, false);
    }

    @Bean
    TopicExchange topicExchange() {
        return new TopicExchange(topicExchangeName);
    }

    @Bean
    Binding binding(Queue queue, TopicExchange topicExchange) {
        return BindingBuilder.bind(queue).to(topicExchange).with("email.#");
    }

    @Bean
    MessageListenerAdapter listenerAdapter(EmailReceiver emailReceiver) {
        return new MessageListenerAdapter(emailReceiver, "receiveEmail");
    }

    @Bean
    SimpleMessageListenerContainer container(ConnectionFactory connectionFactory, MessageListenerAdapter listenerAdapter) {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.setQueueNames(emailQueue);
        container.setMessageListener(listenerAdapter);
        ExponentialBackOff backOff = new ExponentialBackOff();
        backOff.setInitialInterval(30000);
        backOff.setMultiplier(2);
        backOff.setMaxElapsedTime(120000);
        container.setRecoveryBackOff(backOff);
        return container;
    }
}
