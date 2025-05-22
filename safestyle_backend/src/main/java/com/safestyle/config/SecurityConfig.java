package com.safestyle.config;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()  // libera OPTIONS para todas as rotas
                .requestMatchers("/usuarios/**").permitAll()            // libera rota de usuarios
                .anyRequest().authenticated()
                .and()
                .httpBasic();
        return http.build();
    }
}
